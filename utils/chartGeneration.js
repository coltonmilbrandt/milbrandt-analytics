import puppeteer from "puppeteer"
import { s3, bucketName } from "../aws-config" // Adjust the import path
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import yahooFinance from "yahoo-finance2"

export async function generateChart(
	symbol,
	interval,
	startDate,
	endDate = new Date()
) {
	console.log("Received dates:", { startDate, endDate })

	// Format the dates to the required format for Yahoo Finance API
	const period1 = moment(startDate).format("YYYY-MM-DD")
	const period2 = moment(endDate).format("YYYY-MM-DD")

	console.log("Formatted dates:", { period1, period2 })

	// Fetch the data using yahoo-finance2
	const data = await yahooFinance.historical(symbol, {
		period1,
		period2,
		interval,
	})

	if (!data || data.length === 0) {
		throw new Error("No data returned from Yahoo Finance API")
	}

	// Log the fetched data
	console.log("Fetched Data:", data)

	// Process data for echarts
	const chartData = data.map((item) => [
		item.date,
		item.open,
		item.close,
		item.low,
		item.high,
	])
	const volumeData = data.map((item) => ({
		date: item.date,
		volume: item.volume,
		color: item.close > item.open ? "#92d3cc" : "#f8a9a7",
	}))

	// Log the processed data
	console.log("Chart Data:", chartData)
	console.log("Volume Data:", volumeData)

	// Launch a headless browser
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	// Set the content of the page
	await page.setContent(`
	<html>
	  <head>
		  <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
		</head>
		<body>
		<div id="chart" style="width: 1500px; height: 900px;"></div>
		<script>
          console.log("Initializing ECharts...");
          const chartData = ${JSON.stringify(chartData)};
          const volumeData = ${JSON.stringify(volumeData)};

          console.log("Chart Data:", chartData);
          console.log("Volume Data:", volumeData);

          const myChart = echarts.init(document.getElementById('chart'));
          const option = {
            title: {
              text: '${symbol}',
              left: 'center',
              textStyle: { color: '#151924' },
            },
            backgroundColor: '#fff',
            tooltip: {
              trigger: 'axis',
              axisPointer: { type: 'cross' },
            },
            grid: [
              { left: '10%', right: '8%', height: '50%' },
              { left: '10%', right: '8%', top: '65%', height: '16%' },
            ],
            xAxis: [
              {
                type: 'category',
                data: chartData.map(item => item[0]),
                scale: true,
                boundaryGap: false,
                axisLine: { lineStyle: { color: '#f3f4f4' } },
                axisLabel: { show: false },
                splitLine: { lineStyle: { color: '#f3f4f4' } },
              },
              {
                type: 'category',
                gridIndex: 1,
                data: chartData.map(item => item[0]),
                axisLine: { lineStyle: { color: '#f3f4f4' } },
                axisLabel: {
                  color: '#222',
                  formatter: (value, index) => {
                    const date = new Date(value);
                    const day = date.getDate();
                    const month = date.toLocaleString("default", {
                      month: "short",
                    });

                    if (index === 0) {
                      return month;
                    }

                    const prevDate = new Date(chartData[index - 1][0]);
                    const prevMonth = prevDate.getMonth();
                    const currMonth = date.getMonth();

                    if (currMonth !== prevMonth) {
                      return month;
                    }

                    return \`\${day}\`;
                  },
                },
                splitLine: { lineStyle: { color: '#f3f4f4' } },
              },
            ],
            yAxis: [
              {
                scale: true,
                position: 'right',
                axisLine: { lineStyle: { color: '#f3f4f4' } },
                axisLabel: { color: '#151924' },
                splitLine: { show: true, lineStyle: { color: '#f3f4f4' } },
                max: value => Math.ceil((value.max * 1.3) / 10) * 10,
              },
              {
                gridIndex: 1,
                axisLine: { lineStyle: { color: '#f3f4f4' } },
                axisLabel: { show: false },
                splitLine: { lineStyle: { color: '#f3f4f4' } },
              },
            ],
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100,
              },
              {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 10,
                end: 100,
              },
            ],
            series: [
              {
                name: '${symbol}',
                type: 'candlestick',
                data: chartData.map(item => [item[1], item[2], item[3], item[4]]),
                itemStyle: {
                  color: '#1e9981',
                  color0: '#f23646',
                  borderColor: '#1e9981',
                  borderColor0: '#f23646',
                },
              },
              {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: volumeData.map(item => ({
                  value: item.volume,
                  itemStyle: { color: item.color },
                })),
              },
            ],
          };

          myChart.setOption(option);
          console.log("ECharts initialized successfully");
        </script>
      </body>
    </html>
  `)

	// Wait for the chart to be rendered
	await page.waitForSelector("#chart")

	// Add a delay to ensure the chart is fully rendered
	await new Promise((resolve) => setTimeout(resolve, 3000)) // wait for 3 seconds

	// Get the bounding box of the chart element
	const chartElement = await page.$("#chart")
	const boundingBox = await chartElement.boundingBox()

	console.log("Bounding box:", boundingBox)

	// Define the cropping dimensions
	const crop = {
		x: boundingBox.x + 150,
		y: boundingBox.y + 50,
		width: boundingBox.width - 269,
		height: boundingBox.height - 220,
	}

	console.log("Crop dimensions:", crop)

	// Ensure all values are positive integers
	Object.keys(crop).forEach((key) => {
		crop[key] = Math.max(0, Math.floor(crop[key]))
	})

	// Capture the chart as a screenshot with cropping
	const buffer = await page.screenshot({
		type: "png",
		clip: crop,
	})

	// Close the browser
	await browser.close()

	// Upload to S3
	const fileName = `${symbol}/${interval}/${moment().format(
		"YYYY-MM-DD_HH-mm-ss"
	)}.png`
	const params = {
		Bucket: bucketName,
		Key: fileName,
		Body: buffer,
		ContentType: "image/png",
	}

	const uploadResult = await s3.upload(params).promise()

	return uploadResult.Location
}

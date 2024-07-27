import puppeteer from "puppeteer"
import moment from "moment"
import yahooFinance from "yahoo-finance2"

export async function generateChart(
	symbol,
	interval,
	startDate,
	endDate = new Date()
) {
	console.log("Received dates in generateChart:", { startDate, endDate })

	const period1 = moment(startDate).format("YYYY-MM-DD")
	const period2 = moment(endDate).format("YYYY-MM-DD")

	console.log("Formatted dates:", { period1, period2 })

	const data = await yahooFinance.historical(symbol, {
		period1,
		period2,
		interval,
	})

	if (!data || data.length === 0) {
		throw new Error("No data returned from Yahoo Finance API")
	}

	console.log("Fetched Data:", data)

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

	console.log("Chart Data:", chartData)
	console.log("Volume Data:", volumeData)

	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.setContent(`
  <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    </head>
    <body>
    <div id="chart" style="width: 1500px; height: 900px;"></div>
    <script>
          const chartData = ${JSON.stringify(chartData)};
          const volumeData = ${JSON.stringify(volumeData)};

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
        </script>
      </body>
    </html>
  `)

	await page.waitForSelector("#chart")

	await new Promise((resolve) => setTimeout(resolve, 3000))

	const chartElement = await page.$("#chart")
	const boundingBox = await chartElement.boundingBox()

	const crop = {
		x: boundingBox.x + 150,
		y: boundingBox.y + 50,
		width: boundingBox.width - 269,
		height: boundingBox.height - 220,
	}

	Object.keys(crop).forEach((key) => {
		crop[key] = Math.max(0, Math.floor(crop[key]))
	})

	const buffer = await page.screenshot({
		type: "png",
		clip: crop,
		encoding: "base64",
	})

	await browser.close()

	return buffer
}

import React, { useEffect, useState } from "react"
import axios from "axios"
import * as echarts from "echarts"

const Chart = () => {
	const [data, setData] = useState([])
	const [volumeData, setVolumeData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/data.json")
				console.log("Fetched Data:", response.data)
				if (Array.isArray(response.data)) {
					const chartData = []
					const volumeData = []
					response.data.forEach((item) => {
						chartData.push([
							item.date,
							item.open,
							item.close,
							item.low,
							item.high,
						])
						volumeData.push([item.date, item.volume])
					})
					setData(chartData)
					setVolumeData(volumeData)
					console.log("Formatted Chart Data:", chartData)
					console.log("Formatted Volume Data:", volumeData)
				} else {
					console.error("Data format is incorrect")
				}
			} catch (error) {
				console.error("Error fetching chart data:", error)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (data.length > 0) {
			const chartDom = document.getElementById("chart_div")
			const myChart = echarts.init(chartDom)

			const option = {
				title: {
					text: "AAPL Stock Price with Volume",
					left: "center",
					textStyle: { color: "#ffffff" },
				},
				backgroundColor: "#0d0d0d",
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
					},
				},
				legend: {
					data: ["AAPL", "Volume"],
					textStyle: { color: "#ffffff" },
				},
				grid: [
					{
						left: "10%",
						right: "8%",
						height: "50%",
					},
					{
						left: "10%",
						right: "8%",
						top: "65%",
						height: "16%",
					},
				],
				xAxis: [
					{
						type: "category",
						data: data.map((item) => item[0]),
						scale: true,
						boundaryGap: false,
						axisLine: { lineStyle: { color: "#8392A5" } },
						axisLabel: { color: "#ffffff" },
						splitLine: { show: false },
					},
					{
						type: "category",
						gridIndex: 1,
						data: data.map((item) => item[0]),
						axisLine: { lineStyle: { color: "#8392A5" } },
						axisLabel: { color: "#ffffff" },
					},
				],
				yAxis: [
					{
						scale: true,
						axisLine: { lineStyle: { color: "#8392A5" } },
						axisLabel: { color: "#ffffff" },
						splitLine: { lineStyle: { color: "#333" } },
					},
					{
						gridIndex: 1,
						axisLine: { lineStyle: { color: "#8392A5" } },
						axisLabel: { color: "#ffffff" },
						splitLine: { lineStyle: { color: "#333" } },
					},
				],
				dataZoom: [
					{
						type: "inside",
						xAxisIndex: [0, 1],
						start: 10,
						end: 100,
					},
					{
						show: true,
						xAxisIndex: [0, 1],
						type: "slider",
						top: "85%",
						start: 10,
						end: 100,
					},
				],
				series: [
					{
						name: "AAPL",
						type: "candlestick",
						data: data.map((item) => [
							item[1],
							item[2],
							item[3],
							item[4],
						]),
						itemStyle: {
							color: "#0f9d58",
							color0: "#a52714",
							borderColor: "#0f9d58",
							borderColor0: "#a52714",
						},
					},
					{
						name: "Volume",
						type: "bar",
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: volumeData.map((item) => item[1]),
						itemStyle: {
							color: "#8392A5",
						},
					},
				],
			}

			myChart.setOption(option)

			return () => {
				myChart.dispose()
			}
		}
	}, [data, volumeData])

	return <div id="chart_div" style={{ width: "100%", height: "600px" }}></div>
}

export default Chart

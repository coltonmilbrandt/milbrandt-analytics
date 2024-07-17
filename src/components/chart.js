import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import * as echarts from "echarts"

const Chart = () => {
	const [data, setData] = useState([])
	const [volumeData, setVolumeData] = useState([])
	const chartRef = useRef(null)
	const dataRef = useRef([])
	const monthDisplayedRef = useRef({})

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
						volumeData.push({
							date: item.date,
							volume: item.volume,
							color:
								item.close > item.open ? "#92d3cc" : "#f8a9a7", // Green for bullish, red for bearish
						})
					})
					setData(chartData)
					setVolumeData(volumeData)
					dataRef.current = chartData // Update the ref with the new data
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
			chartRef.current = myChart

			const option = {
				title: {
					text: "BTC",
					left: "center",
					textStyle: { color: "#151924" },
				},
				backgroundColor: "#fff",
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
					},
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
						axisLine: { lineStyle: { color: "#f3f4f4" } },
						axisLabel: { show: false }, // Hide labels on the candlestick x-axis
						splitLine: { lineStyle: { color: "#f3f4f4" } },
					},
					{
						type: "category",
						gridIndex: 1,
						data: data.map((item) => item[0]),
						axisLine: { lineStyle: { color: "#f3f4f4" } },
						axisLabel: {
							color: "#222", // Show labels on the volume x-axis
							formatter: (value, index) => {
								const date = new Date(value) // Convert the value to a Date object
								const day = date.getDate() // Get the day of the month
								const month = date.toLocaleString("default", {
									month: "short",
								}) // Get the short month name

								if (index === 0) {
									// If it's the first data point, return the month
									monthDisplayedRef.current = {}
									console.log(
										`Index: ${index}, Value: ${value}, Output: ${month}`
									)
									return month
								}

								const prevDate = new Date(
									dataRef.current[index - 1][0]
								) // Get the previous date
								const prevMonth = prevDate.getMonth()
								const currMonth = date.getMonth()

								// console.log(`prev date: ${prevDate}`)
								// console.log(`current day: ${day}`)
								// console.log(`prev Month: ${prevMonth}`)
								// console.log(`current month: ${currMonth}`)

								if (currMonth !== prevMonth) {
									if (!monthDisplayedRef.current[currMonth]) {
										monthDisplayedRef.current[
											currMonth
										] = true
										// console.log(
										// 	`Index: ${index}, Value: ${value}, Output: ${month}`
										// )
										return month
									}
								}

								// If not the first day of a new month, return the day
								// console.log(
								// 	`Index: ${index}, Value: ${value}, Output: ${day}`
								// )
								return `${day}`
							},
						},
						splitLine: { lineStyle: { color: "#f3f4f4" } },
					},
				],
				yAxis: [
					{
						scale: true,
						position: "right", // Move price labels to the right
						axisLine: { lineStyle: { color: "#f3f4f4" } },
						axisLabel: { color: "#151924" },
						splitLine: {
							show: true,
							lineStyle: { color: "#f3f4f4" },
						}, // Ensure gridlines are visible for the main chart
						max: (value) => Math.ceil((value.max * 1.3) / 10) * 10, // round to nearest 10
					},
					{
						gridIndex: 1,
						axisLine: { lineStyle: { color: "#f3f4f4" } },
						axisLabel: { show: false }, // Hide labels on the volume y-axis
						splitLine: { lineStyle: { color: "#f3f4f4" } },
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
						name: "BTC",
						type: "candlestick",
						data: data.map((item) => [
							item[1],
							item[2],
							item[3],
							item[4],
						]),
						itemStyle: {
							color: "#1e9981",
							color0: "#f23646",
							borderColor: "#1e9981",
							borderColor0: "#f23646",
						},
					},
					{
						name: "Volume",
						type: "bar",
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: volumeData.map((item) => ({
							value: item.volume,
							itemStyle: { color: item.color },
						})),
					},
				],
			}

			myChart.setOption(option)

			return () => {
				myChart.dispose()
			}
		}
	}, [data, volumeData])

	const handleSnapshot = (
		cropLeft = 0,
		cropRight = 0,
		cropTop = 0,
		cropBottom = 0
	) => {
		if (chartRef.current) {
			const img = chartRef.current.getDataURL({
				type: "png",
				pixelRatio: 2,
				backgroundColor: "#fff",
			})

			// Create an image element
			const image = new Image()
			image.src = img
			image.onload = () => {
				// Create a canvas element
				const canvas = document.createElement("canvas")
				const ctx = canvas.getContext("2d")

				// Set canvas dimensions
				canvas.width = image.width - cropLeft - cropRight
				canvas.height = image.height - cropTop - cropBottom // Add extra space at the top

				// Fill the canvas with white color
				ctx.fillStyle = "#fff"
				ctx.fillRect(0, 0, canvas.width, canvas.height)

				// Draw the image onto the canvas, cropping the specified amounts
				ctx.drawImage(
					image,
					cropLeft,
					cropTop, // Start point in the source image
					canvas.width,
					image.height - cropTop - cropBottom, // Height to draw
					0,
					0, // Start point in the destination canvas (300px down)
					canvas.width,
					image.height - cropTop - cropBottom // Height to draw in the destination canvas
				)

				// Get the cropped image data
				const croppedImg = canvas.toDataURL("image/png")

				// Send the cropped image data to the server for saving
				fetch("/api/upload", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ image: croppedImg }),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.success) {
							console.log(
								"Image uploaded successfully:",
								data.path
							)
						} else {
							console.error("Failed to upload image")
						}
					})
					.catch((error) => console.error("Error:", error))
			}
		}
	}

	return (
		<div>
			<div
				id="chart_div"
				style={{ width: "100%", height: "800px" }}
			></div>
			<button onClick={() => handleSnapshot(800, 250, 50, 295)}>
				Take Snapshot
			</button>
		</div>
	)
}

export default Chart

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
					text: "AAPL",
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

								console.log(`prev date: ${prevDate}`)
								console.log(`current day: ${day}`)
								console.log(`prev Month: ${prevMonth}`)
								console.log(`current month: ${currMonth}`)

								if (currMonth !== prevMonth) {
									if (!monthDisplayedRef.current[currMonth]) {
										monthDisplayedRef.current[
											currMonth
										] = true
										console.log(
											`Index: ${index}, Value: ${value}, Output: ${month}`
										)
										return month
									}
								}

								// If not the first day of a new month, return the day
								console.log(
									`Index: ${index}, Value: ${value}, Output: ${day}`
								)
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
						splitLine: { lineStyle: { color: "#f3f4f4" } },
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
						name: "AAPL",
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
		cropBottom = 0,
		extraTop = 300, // New parameter for extra space at the top
		extraRight = 300 // New parameter for extra space to the right
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
				canvas.width = image.width + extraRight // Add extra space to the right
				canvas.height = image.height + extraTop // Add extra space at the top

				// Fill the canvas with white color
				ctx.fillStyle = "#fff"
				ctx.fillRect(0, 0, canvas.width, canvas.height)

				// Draw the entire image onto the canvas
				ctx.drawImage(image, 0, extraTop)

				const testImg = canvas.toDataURL("image/png")

				console.log(testImg)

				// Create a canvas element to save the 50px slice
				const sliceCanvas = document.createElement("canvas")
				const sliceCtx = sliceCanvas.getContext("2d")

				// Set slice canvas dimensions
				sliceCanvas.width = 60
				sliceCanvas.height = image.height

				// Draw the 50px slice onto the slice canvas
				sliceCtx.drawImage(
					image,
					image.width - 240, // Start point for the last 60 pixels in the source image
					0, // Start point in the source image
					60, // Width of the last 60 pixels
					image.height, // Height to draw from the source
					0,
					0, // Start point in the destination canvas
					60, // Width to draw in the destination canvas
					image.height // Height to draw in the destination canvas
				)

				// Get the 50px slice image data
				const sliceImg = sliceCanvas.toDataURL("image/png")

				console.log(sliceImg)

				// Create an image element for the 50px slice
				const sliceImage = new Image()
				sliceImage.src = sliceImg
				sliceImage.onload = () => {
					// Create a canvas element for the final image
					const finalCanvas = document.createElement("canvas")
					const finalCtx = finalCanvas.getContext("2d")

					// Set final canvas dimensions
					finalCanvas.width =
						image.width - cropLeft - cropRight + extraRight
					finalCanvas.height =
						image.height - cropTop - cropBottom + extraTop

					// Fill the final canvas with white color
					finalCtx.fillStyle = "#fff"
					finalCtx.fillRect(
						0,
						0,
						finalCanvas.width,
						finalCanvas.height
					)

					// Draw the cropped image onto the final canvas
					finalCtx.drawImage(
						image,
						cropLeft,
						cropTop, // Start point in the source image
						image.width - cropLeft - cropRight, // Width to draw from the source
						image.height - cropTop - cropBottom, // Height to draw from the source
						0,
						extraTop, // Start point in the destination canvas
						image.width - cropLeft - cropRight, // Width to draw in the destination canvas
						image.height - cropTop - cropBottom // Height to draw in the destination canvas
					)

					// Draw the 50px slice at the far right side of the final canvas
					finalCtx.drawImage(
						sliceImage,
						0,
						0, // Start point in the source image
						50, // Width of the 50px slice
						sliceImage.height, // Height of the 50px slice
						finalCanvas.width - 50, // Start point in the destination canvas for the 50px slice
						extraTop, // Start point in the destination canvas (300px down)
						50, // Width to draw in the destination canvas
						sliceImage.height // Height to draw in the destination canvas
					)

					// Get the final image data
					const finalImg = finalCanvas.toDataURL("image/png")

					console.log(finalImg)

					// Send the final image data to the server for saving
					fetch("/api/upload", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ image: finalImg }),
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
	}

	return (
		<div>
			<div
				id="chart_div"
				style={{ width: "100%", height: "600px" }}
			></div>
			<button onClick={() => handleSnapshot(900, 250, 50, 220, 300, 500)}>
				Take Snapshot
			</button>
		</div>
	)
}

export default Chart

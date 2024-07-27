import React, { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import Dropdown from "./common/Dropdown"

const CreateChart = () => {
	const [symbol, setSymbol] = useState("BTC-USD")
	const [interval, setInterval] = useState("1d")
	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"))
	const [imageUrl, setImageUrl] = useState("")
	const [creativity, setCreativity] = useState(0.1)
	const [prompt, setPrompt] = useState("")
	const [outpaintedImage, setOutpaintedImage] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		updatePrompt()
	}, [symbol, interval])

	const updatePrompt = () => {
		const newPrompt = `${interval.toUpperCase()} Tradingview ${symbol.replace(
			"-",
			""
		)} candlestick chart. Candlesticks go all the way to the right side of the chart. Light grey gridlines run across the chart horizontally for the full width. [[[no labels]]] [[[no words]]] [[[no text]]] [[[no numbers]]] [[[no gaps]]] [[[full width]]]`
		setPrompt(newPrompt)
	}

	const validateInputs = () => {
		if (!symbol) {
			setError("Symbol is required")
			return false
		}

		if (!interval) {
			setError("Interval is required")
			return false
		}

		if (!startDate) {
			setError("Start date is required")
			return false
		}

		if (startDate === endDate) {
			setError("Start date and end date cannot be the same")
			return false
		}

		if (!creativity || creativity < 0 || creativity > 1) {
			setError("Creativity must be between 0 and 1")
			return false
		}

		return true
	}

	const handleGenerateChart = async () => {
		setError("") // Clear previous errors

		if (!validateInputs()) {
			return
		}

		try {
			const response = await axios.post("/api/aws-chart-upload", {
				symbol,
				interval,
				startDate,
				endDate,
			})
			if (response.data.success) {
				console.log("Image uploaded to S3:", response.data.url)
				setImageUrl(response.data.url)
			} else {
				console.error("Failed to generate chart:", response.data.error)
				setError("Failed to generate chart: " + response.data.error)
			}
		} catch (error) {
			console.error("Error:", error)
			setError("Error generating chart: " + error.message)
		}
	}

	const handleOutpaintTest = async () => {
		setError("") // Clear previous errors

		if (!validateInputs()) {
			return
		}

		try {
			const response = await axios.post("/api/outpaint", {
				symbol,
				interval,
				startDate,
				endDate,
				creativity,
				prompt,
			})

			if (response.data.success) {
				setOutpaintedImage(
					`data:image/png;base64,${response.data.image}`
				)
			} else {
				console.error("Failed to outpaint image:", response.data.error)
				setError("Failed to outpaint image: " + response.data.error)
			}
		} catch (error) {
			console.error("Error:", error)
			setError("Error outpainting image: " + error.message)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-700">
				{error && (
					<div className="mb-4 p-4 text-white bg-red-600 rounded-lg">
						{error}
					</div>
				)}
				<div className="mb-4">
					<label className="block text-gray-200 mb-2">Symbol</label>
					<input
						type="text"
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
						placeholder="Enter Symbol"
						className="w-full border border-gray-600 rounded p-3 bg-gray-700 text-white focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-200 mb-2">Interval</label>
					<Dropdown
						options={["1wk", "1d", "1mo"]}
						value={interval}
						onChange={setInterval}
						className="w-full border border-gray-600 rounded p-3 bg-gray-700 text-white focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-200 mb-2">
						Start Date
					</label>
					<input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="w-full border border-gray-600 rounded p-3 bg-gray-700 text-white focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-200 mb-2">End Date</label>
					<input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="w-full border border-gray-600 rounded p-3 bg-gray-700 text-white focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-200 mb-2">
						Creativity
					</label>
					<input
						type="number"
						value={creativity}
						onChange={(e) =>
							setCreativity(parseFloat(e.target.value))
						}
						min="0"
						max="1"
						step="0.1"
						className="w-full border border-gray-600 rounded p-3 bg-gray-700 text-white focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-200 mb-2">Prompt</label>
					<input
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						className="w-full border border-gray-600 rounded p-3 bg-gray-700 text-white focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="flex space-x-4">
					<button
						className="flex-1 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded shadow-lg transition transform hover:scale-105"
						onClick={handleGenerateChart}
					>
						Generate Chart
					</button>
					<button
						className="flex-1 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded shadow-lg transition transform hover:scale-105"
						onClick={handleOutpaintTest}
					>
						Outpaint Image
					</button>
				</div>
				<div className="mt-4 text-gray-300">
					{startDate} {endDate}
				</div>
				{imageUrl && (
					<img
						src={imageUrl}
						alt="Generated Chart"
						className="mt-4 w-full rounded"
					/>
				)}
				{outpaintedImage && (
					<img
						src={outpaintedImage}
						alt="Outpainted Image"
						className="mt-4 w-full rounded"
					/>
				)}
			</div>
		</div>
	)
}

export default CreateChart

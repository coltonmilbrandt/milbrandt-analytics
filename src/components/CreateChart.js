import React, { useState } from "react"
import axios from "axios"

const CreateChart = () => {
	const [symbol, setSymbol] = useState("BTC-USD")
	const [interval, setInterval] = useState("1d")
	const [imageUrl, setImageUrl] = useState("")

	const handleGenerateChart = async () => {
		try {
			const response = await axios.post("/api/generateChart", {
				symbol,
				interval,
			})
			if (response.data.success) {
				setImageUrl(response.data.url)
			} else {
				console.error("Failed to generate chart:", response.data.error)
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
		<div className="text-gray-800">
			<input
				type="text"
				value={symbol}
				onChange={(e) => setSymbol(e.target.value)}
				placeholder="Enter Symbol"
			/>
			<input
				type="text"
				value={interval}
				onChange={(e) => setInterval(e.target.value)}
				placeholder="Enter Interval"
			/>
			<button className="text-white" onClick={handleGenerateChart}>
				Generate Chart
			</button>
			{imageUrl && <img src={imageUrl} alt="Generated Chart" />}
		</div>
	)
}

export default CreateChart

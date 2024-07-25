import React, { useState } from "react"
import axios from "axios"
import moment from "moment"

const CreateChart = () => {
	const [symbol, setSymbol] = useState("BTC-USD")
	const [interval, setInterval] = useState("1d")
	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"))
	const [imageUrl, setImageUrl] = useState("")

	const handleGenerateChart = async () => {
		console.log("Start Date:", startDate)
		console.log("End Date:", endDate)

		if (!startDate) {
			console.error("Start date is required")
			return
		}

		if (startDate === endDate) {
			console.error("Start date and end date cannot be the same")
			return
		}

		console.log("Sending request with dates:", { startDate, endDate })

		try {
			const response = await axios.post("/api/generate-chart", {
				symbol,
				interval,
				startDate,
				endDate,
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
			<input
				type="date"
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
				placeholder="Enter Start Date"
			/>
			<input
				type="date"
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
				placeholder="Enter End Date"
			/>
			<button className="text-white" onClick={handleGenerateChart}>
				Generate Chart
			</button>
			<div className="text-white">
				{startDate} {endDate}
			</div>
			{imageUrl && <img src={imageUrl} alt="Generated Chart" />}
		</div>
	)
}

export default CreateChart

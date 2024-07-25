// src/pages/api/generate-chart.js
import { generateChart } from "../../utils/chartGeneration"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { symbol, interval, startDate, endDate } = req.body

		console.log("Request body:", req.body)

		try {
			const url = await generateChart(
				symbol,
				interval,
				startDate,
				endDate
			)
			res.status(200).json({ success: true, url })
		} catch (error) {
			console.error("Error generating chart:", error)
			res.status(500).json({ success: false, error: error.message })
		}
	} else {
		res.status(405).json({ success: false, message: "Method not allowed" })
	}
}

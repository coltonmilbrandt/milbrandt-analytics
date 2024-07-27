// src/pages/api/aws-chart-upload.js
import { generateAndUploadChart } from "../../utils/chartService"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { symbol, interval, startDate, endDate } = req.body

		if (!symbol || !interval || !startDate) {
			res.status(400).json({
				success: false,
				message: "Missing required fields",
			})
			return
		}

		try {
			const url = await generateAndUploadChart(
				symbol,
				interval,
				startDate,
				endDate
			)
			res.status(200).json({
				success: true,
				url: url,
			})
		} catch (error) {
			console.error("Error generating and uploading chart:", error)
			res.status(500).json({ success: false, error: error.message })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

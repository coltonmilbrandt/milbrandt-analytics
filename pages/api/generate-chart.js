import { generateChart } from "../../utils/chartGeneration"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { symbol, interval } = req.body

		try {
			const imageUrl = await generateChart(symbol, interval)
			res.status(200).json({ success: true, url: imageUrl })
		} catch (error) {
			console.error("Error generating chart:", error)
			res.status(500).json({ success: false, error: error.message })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

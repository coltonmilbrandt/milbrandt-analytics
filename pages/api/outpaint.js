import { generateChart } from "../../utils/chartGeneration"
import { outpaintImage } from "../../utils/outpaint"

export default async function handler(req, res) {
	if (req.method === "POST") {
		const {
			symbol,
			interval,
			startDate,
			endDate,
			creativity = 0.1,
			prompt = "",
		} = req.body

		try {
			// Generate the chart and get the base64 image
			const base64Image = await generateChart(
				symbol,
				interval,
				startDate,
				endDate
			)
			const imageBuffer = Buffer.from(base64Image, "base64")

			// Outpaint the generated chart
			const outpaintedBuffer = await outpaintImage(
				imageBuffer,
				creativity,
				prompt
			)

			// Return the outpainted image as a base64 string
			const outpaintedBase64 = outpaintedBuffer.toString("base64")

			res.status(200).json({
				success: true,
				image: outpaintedBase64,
			})
		} catch (error) {
			console.error("Error generating and outpainting chart:", error)
			res.status(500).json({ success: false, error: error.message })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

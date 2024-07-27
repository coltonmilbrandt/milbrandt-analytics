import axios from "axios"
import FormData from "form-data"
import { Readable } from "stream"

export const outpaintImage = async (imageBuffer, creativity, prompt) => {
	const stream = Readable.from(imageBuffer)
	const formData = new FormData()
	formData.append("image", stream, { filename: "chart.png" })
	formData.append("right", 500)
	formData.append("output_format", "png")
	formData.append("creativity", creativity)
	formData.append("prompt", prompt)

	try {
		const response = await axios.post(
			`https://api.stability.ai/v2beta/stable-image/edit/outpaint`,
			formData,
			{
				validateStatus: undefined,
				responseType: "arraybuffer",
				headers: {
					Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`,
					...formData.getHeaders(),
				},
			}
		)

		if (response.status === 200) {
			return Buffer.from(response.data)
		} else {
			throw new Error(`${response.status}: ${response.data.toString()}`)
		}
	} catch (error) {
		console.error("Error during outpainting:", error)
		throw error
	}
}

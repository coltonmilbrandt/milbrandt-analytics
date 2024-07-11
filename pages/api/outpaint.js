import fs from "fs"
import axios from "axios"
import FormData from "form-data"
import path from "path"

const outpaintImage = async (imagePath, outputPath, creativity, prompt) => {
	const payload = {
		image: fs.createReadStream(imagePath),
		right: 500, // Outpaint 500 pixels to the right
		up: 300,
		output_format: "webp",
		creativity, // Add creativity parameter
		prompt, // Add prompt parameter
	}

	try {
		const response = await axios.post(
			`https://api.stability.ai/v2beta/stable-image/edit/outpaint`,
			axios.toFormData(payload, new FormData()),
			{
				validateStatus: undefined,
				responseType: "arraybuffer",
				headers: {
					Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`,
					Accept: "image/*",
				},
			}
		)

		if (response.status === 200) {
			fs.writeFileSync(outputPath, Buffer.from(response.data))
			console.log("Outpainted image saved successfully")
		} else {
			throw new Error(`${response.status}: ${response.data.toString()}`)
		}
	} catch (error) {
		console.error("Error during outpainting:", error)
	}
}

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { creativity = 0.5, prompt = "" } = req.body // Default values
		const imagePath = path.join(
			process.cwd(),
			"public",
			"imageTest",
			"chart_snapshot_cropped.png"
		)
		const outputPath = path.join(
			process.cwd(),
			"public",
			"imageTest",
			"outpainted_image.webp"
		)

		try {
			await outpaintImage(imagePath, outputPath, creativity, prompt)
			res.status(200).json({
				success: true,
				path: "/imageTest/outpainted_image.webp",
			})
		} catch (error) {
			console.error("Error during outpainting:", error)
			res.status(500).json({ success: false, error: error.message })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

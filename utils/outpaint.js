const fs = require("fs")
const axios = require("axios")
const FormData = require("form-data")
const path = require("path")

const outpaintImage = async (imagePath, outputPath) => {
	const payload = {
		image: fs.createReadStream(imagePath),
		left: 200,
		down: 200,
		output_format: "webp",
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

// Example usage:
const imagePath = path.join(
	__dirname,
	"public",
	"imageTest",
	"chart_snapshot_cropped.png"
) // Path to your saved image
const outputPath = path.join(
	__dirname,
	"public",
	"imageTest",
	"outpainted_image.webp"
) // Path to save the outpainted image

outpaintImage(imagePath, outputPath)

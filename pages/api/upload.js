import fs from "fs"
import path from "path"

export default function handler(req, res) {
	console.log("Handler reached:", req.method)
	if (req.method === "POST") {
		const { image } = req.body
		console.log("Image data received:", image.substring(0, 100)) // Log first 100 chars of the image data
		const base64Data = image.replace(/^data:image\/png;base64,/, "")
		const filePath = path.join(
			process.cwd(),
			"public",
			"imageTest",
			"chart_snapshot_cropped.png"
		)

		// Ensure the directory exists
		fs.mkdirSync(path.dirname(filePath), { recursive: true })

		fs.writeFile(filePath, base64Data, "base64", (err) => {
			if (err) {
				console.error("Error saving image:", err)
				return res.status(500).json({ success: false })
			}

			res.status(200).json({
				success: true,
				path: "/imageTest/chart_snapshot_cropped.png",
			})
		})
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

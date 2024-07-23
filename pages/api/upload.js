import { s3, bucketName } from "../../aws-config"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"

export default function handler(req, res) {
	if (req.method === "POST") {
		const { image, ticker, date, timeframe } = req.body

		if (!image || !ticker || !date || !timeframe) {
			return res
				.status(400)
				.json({ success: false, message: "Missing required fields" })
		}

		const base64Data = Buffer.from(
			image.replace(/^data:image\/\w+;base64,/, ""),
			"base64"
		)
		const type = image.split(";")[0].split("/")[1]
		const timestamp = moment().format("YYYYMMDD-HHmmss")

		const params = {
			Bucket: bucketName,
			Key: `${ticker}/${date}/${timeframe}/${timestamp}-${uuidv4()}.${type}`, // Generate a structured path for the image
			Body: base64Data,
			ContentEncoding: "base64", // required
			ContentType: `image/${type}`, // required
		}

		s3.upload(params, function (err, data) {
			if (err) {
				console.error("Error uploading image:", err)
				return res.status(500).json({ success: false, error: err })
			}
			res.status(200).json({
				success: true,
				url: data.Location,
			})
		})
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

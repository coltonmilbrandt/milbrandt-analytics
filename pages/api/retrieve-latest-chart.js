import AWS from "aws-sdk"
import { s3, bucketName } from "../../aws-config"

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { ticker, date, timeframe } = req.query

		// Construct the prefix to list objects in the desired path
		const prefix = `${ticker}/${date}/${timeframe}/`

		try {
			// List objects with the specified prefix
			const listParams = {
				Bucket: bucketName,
				Prefix: prefix,
			}

			const data = await s3.listObjectsV2(listParams).promise()

			if (data.Contents.length === 0) {
				return res
					.status(404)
					.json({ success: false, message: "No charts found" })
			}

			// Sort objects by LastModified date to get the latest one
			const sortedObjects = data.Contents.sort(
				(a, b) => new Date(b.LastModified) - new Date(a.LastModified)
			)
			const latestObject = sortedObjects[0]

			// Get the latest object URL
			const latestUrl = `https://${bucketName}.s3.amazonaws.com/${latestObject.Key}`

			res.status(200).json({
				success: true,
				url: latestUrl,
				details: {
					ticker,
					date,
					timeframe,
					timestamp: latestObject.LastModified,
				},
			})
		} catch (error) {
			console.error("Error listing objects:", error)
			res.status(500).json({ success: false, error })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

import { generateChart } from "./chartGeneration"
import { s3, bucketName } from "../aws-config"
import moment from "moment"

export async function generateAndUploadChart(
	symbol,
	interval,
	startDate,
	endDate
) {
	// Generate the chart and get the base64 image
	const base64Image = await generateChart(
		symbol,
		interval,
		startDate,
		endDate
	)

	// Decode the base64 image
	const bufferData = Buffer.from(base64Image, "base64")

	// Format the current date and time for the file name
	const formattedDate = moment().format("YYYY-MM-DD_HH-mm-ss")

	// Upload the buffer to S3
	const s3Params = {
		Bucket: bucketName, // Use the imported bucket name
		Key: `${symbol}/${interval}/${formattedDate}.png`, // Use formatted date for the file name
		Body: bufferData,
		ContentType: "image/png",
	}

	const s3Response = await s3.upload(s3Params).promise()

	return s3Response.Location
}

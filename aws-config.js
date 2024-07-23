import AWS from "aws-sdk"

const s3 = new AWS.S3({
	accessKeyId:
		process.env.NODE_ENV === "production"
			? process.env.AWS_ACCESS_KEY_ID_PROD
			: process.env.AWS_ACCESS_KEY_ID_DEV,
	secretAccessKey:
		process.env.NODE_ENV === "production"
			? process.env.AWS_SECRET_ACCESS_KEY_PROD
			: process.env.AWS_SECRET_ACCESS_KEY_DEV,
	region: "us-east-2",
})

const bucketName =
	process.env.NODE_ENV === "production"
		? process.env.S3_BUCKET_NAME_PROD
		: process.env.S3_BUCKET_NAME_DEV

export { s3, bucketName }

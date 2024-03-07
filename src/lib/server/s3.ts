import {
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET_NAME,
} from '$env/static/private';
import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

export const uploadFile = (
	fileBuffer: Buffer,
	fileName: string,
	mimetype: string,
) => {
	const uploadParams = {
		Bucket: AWS_BUCKET_NAME,
		Body: fileBuffer,
		Key: fileName,
		ContentType: mimetype,
	};

	return s3Client.send(new PutObjectCommand(uploadParams));
};

export function deleteFile(fileName: string) {
	const deleteParams = {
		Bucket: AWS_BUCKET_NAME,
		Key: fileName,
	};

	return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key: string) {
	const params = {
		Bucket: AWS_BUCKET_NAME,
		Key: key,
	};

	// https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
	const command = new GetObjectCommand(params);
	const seconds = 60;
	const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

	return url;
}

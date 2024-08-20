// aws.js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Create an S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Function to get a video file from S3
export const getVideoFile = async (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        return data.Body; // This is a ReadableStream
    } catch (error) {
        console.error("Error getting video file from S3:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Export the S3 client
export { s3Client };

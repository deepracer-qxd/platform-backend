import { MinioNotInitializedError } from "../../helpers/api-errors"
import MinioClientAdmin from "./MinioClientAdmin"

const minioInstance = MinioClientAdmin.getInstance()
const minioClient = minioInstance.getClient()

export async function getUserPolicy(bucketName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        minioClient.getBucketPolicy(bucketName, (error, policy) => {
            if (error) {
                reject(`Error fetching bucket policy ${error}`);
            } else {
                resolve(`Bucket policy ${policy}`);
            }
        });
    });
}

export async function createBucket(bucketName: string) {
  const bucketExists = await checkIfBucketExists(bucketName)
  if (bucketExists) {
      return {
          message: 'Bucket ' + bucketName + ' exists.'
      };
  } else {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      return {
          message: 'Bucket ' + bucketName + ' created in "us-east-1".'
      };
  }
}

const checkIfBucketExists = async (bucketName: string) => {
    try {
        if (minioClient === null) throw new MinioNotInitializedError('Minio client not initialized');
        return await minioClient.bucketExists(bucketName);
    } catch (e) {
        return e
    }
}

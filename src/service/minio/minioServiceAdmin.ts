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
  try {
    const bucketExists = await checkIfBucketExists(bucketName);
    if (bucketExists) {
      return {
        message: `Bucket '${bucketName}' already exists.`
      };
    } else {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      return {
        message: `Bucket '${bucketName}' created in "us-east-1".`
      };
    }
  } catch (error) {
    const errorMessage = error instanceof MinioNotInitializedError ? error.message : error;
    return {
      error: `Error creating bucket '${bucketName}': ${errorMessage}`
    };
  }
}


async function checkIfBucketExists(bucketName: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    minioClient.bucketExists(bucketName, (error, exists) => {
      if (error) {
        reject(new MinioNotInitializedError('Minio client not initialized'));
      } else {
        resolve(exists);
      }
    });
  })
}

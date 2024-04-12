import { Request, Response } from "express";
import {createBucket, getUserPolicy, getBucketData, getObject} from "../service/minio/minioServiceAdmin";

export class MinioController {
    async createBucket(req: Request, res: Response) {
        const { bucketName } = req.body
        const bucket = await createBucket(bucketName)
        return res.status(200).json(bucket)
    }

    async getUserPolicy(req: Request, res: Response){
        try {
            const { bucketName } = req.body
            const policy = await getUserPolicy(bucketName)
            return res.status(200).json({policy})
        } catch (error){
            return res.status(500).json({error})
        }
    }

    async getBucketData(req: Request, res: Response){
      try {
        const { bucketName } = req.body
        const files = await getBucketData(bucketName)
        return res.status(200).json({files})
      } catch(error){
        return res.status(500).json({error})
      }
    }
    
    async getObjectByBucket(req: Request, res: Response){
      try {
        const { bucketName, objectName } = req.body
        const files = await getObject(bucketName, objectName)
        return res.status(200).json({files})
      } catch(error){
        return res.status(500).json({error})
      }
    }
}
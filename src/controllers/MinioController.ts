import { Request, Response } from "express";
import {createBucket, getUserPolicy} from "../service/minio/minioServiceAdmin";

export class MinioController {
    async createBucket(req: Request, res: Response) {
        const { bucketName } = req.body
        const bucket = await createBucket(bucketName)
        return res.status(200).json(bucket)
    }

    async getUserPolicy(req: Request, res: Response){
        try {
            const { bucketName } = req.body
            const bucketPolicy = await getUserPolicy(bucketName)
            return res.status(200).json(bucketPolicy)
        } catch (e){
            return res.status(500).json({
                error: e
            })
        }
    }
}
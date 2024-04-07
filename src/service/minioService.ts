import * as Minio from 'minio'
import 'dotenv/config'

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_SERVICE_ADDRESS ?? '',
    port: Number(process.env.MINIO_SERVICE_PORT) ?? 0,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY ?? '',
    secretKey: process.env.MINIO_SECRET_KEY ?? '',
})

const bucket = 'joao'

const checkIfBucketExists = async () => {
    const exists = await minioClient.bucketExists(bucket)
    if (exists) {
        console.log('Bucket ' + bucket + ' exists.')
    } else {
        await minioClient.makeBucket(bucket, 'us-east-1')
        console.log('Bucket ' + bucket + ' created in "us-east-1".')
    }
}

checkIfBucketExists()
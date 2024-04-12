import * as Minio from 'minio'
import 'dotenv/config'

export default class MinioClientAdmin {
  private static instance: MinioClientAdmin;
  private readonly minioClient: Minio.Client;
  
  private constructor() {
    this.minioClient = new Minio.Client({
        endPoint: process.env.MINIO_SERVICE_ADDRESS ?? '',
        port: Number(process.env.MINIO_SERVICE_PORT) ?? 0,
        useSSL: false,
        accessKey: process.env.MINIO_ADMIN_ACCESS_KEY ?? '',
        secretKey: process.env.MINIO_ADMIN_SECRET_KEY ?? '',
    })
  }
  
  public static getInstance(): MinioClientAdmin {
    if (!MinioClientAdmin.instance) {
      MinioClientAdmin.instance = new MinioClientAdmin();
    }
    return MinioClientAdmin.instance;
  }
  
  public getClient(): Minio.Client {
    return this.minioClient;
  }
}
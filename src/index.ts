import express from 'express'
import 'express-async-errors'
import {AppDataSource} from "./data-source";
import {errorMiddleware} from "./middlewares/error";
import routes from './routes'
import cors from 'cors';
import MinioClientAdmin from './service/minio/MinioClientAdmin';



AppDataSource.initialize().then(() => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(routes)

    app.use(errorMiddleware)
    
    MinioClientAdmin.getInstance()
    
    return app.listen(process.env.PORT)
})
import { Router } from 'express'
import {UserController} from "./controllers/UserController";
import {authenticationMiddleware} from "./middlewares/authentication";
import {authorizationMiddleware} from "./middlewares/authorization";
import { MinioController } from './controllers/MinioController';

const routes = Router()

routes.post('/login', new UserController().login)

// Auth routes
routes.use(authenticationMiddleware)

routes.get('/profile', new UserController().getProfile)
routes.post('/minio', new MinioController().createBucket)
routes.get('/minio/policy', new MinioController().getUserPolicy)


// Admin routes
routes.use(authorizationMiddleware)
routes.post('/user', new UserController().create)
routes.post('/user/delete/:userId', new UserController().delete)

export default routes
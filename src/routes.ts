import { Router } from 'express'
import {UserController} from "./controllers/UserController";
import {authenticationMiddleware} from "./middlewares/authentication";
import {authorizationMiddleware} from "./middlewares/authorization";

const routes = Router()

routes.post('/login', new UserController().login)

routes.use(authenticationMiddleware)

routes.post('/user', authorizationMiddleware, new UserController().create)
routes.get('/profile', new UserController().getProfile)

export default routes
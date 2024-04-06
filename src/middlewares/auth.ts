import {NextFunction, Request, Response} from "express";
import {UnauthorizedError} from "../helpers/api-errors";
import jwt from "jsonwebtoken";
import {userRepository} from "../repositories/userRepository";

type JwtPayload = {
    id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if(!authorization) throw new UnauthorizedError("The token was not sent")

    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepository.findOneBy({id})

    if(!user) throw new UnauthorizedError(`User not authorized`)

    const {password: _, ...userLogin} = user

    req.user = userLogin

    next()
}
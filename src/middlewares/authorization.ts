import {NextFunction, Request, Response} from "express";
import {ROLE} from "../entities/Role";
import {UnauthorizedError} from "../helpers/api-errors";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user

    if(role != ROLE.ADMIN) throw new UnauthorizedError("You don't have admin role")

    next()
}
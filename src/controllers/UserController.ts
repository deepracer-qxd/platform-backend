import { Request, Response } from "express";
import {userRepository} from "../repositories/userRepository";
import {BadRequestError, UnauthorizedError} from "../helpers/api-errors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class UserController {
    async create(req: Request, res: Response){
        const { name, email, password } = req.body

        const userExists = await userRepository.findOneBy({email})

        if(userExists) throw new BadRequestError(`The user with email ${email} already exists!`)

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
            password: passwordHash
        })

        await userRepository.save(newUser)

        const {password: _, ...user} = newUser
        return res.status(201).json(user)
    }

    async login(req: Request, res: Response){
        const { email, password } = req.body

        const user = await userRepository.findOneBy({email})

        if(!user) throw new BadRequestError(`Invalid email or password`)

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass) throw new BadRequestError(`Invalid email or password`)

        const token = jwt.sign({id: user.id},
            process.env.JWT_PASS ?? '',
            {expiresIn: '8h'})

        const {password: _, ...userLogin} = user

        return res.status(200).json({
            user: userLogin,
            token
        })
    }

    async getProfile(req: Request, res: Response){
        return res.status(200).json(req.user)
    }
}
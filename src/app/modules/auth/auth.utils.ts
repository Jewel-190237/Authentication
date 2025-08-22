import { z } from "zod"
import { TTokenPayload } from "./auth.interface"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

export const validEmailCheck = (email: string) => {
   const schema = z.string().email()
   return schema.safeParse(email)
}

export const createToken = (payload: TTokenPayload, secret: string, expiresIn: string) => {
   //@ts-ignore
   return jwt.sign(payload, secret, { expiresIn })
}


export const comparePassword = (password: string, hasPassword: string) => {
   return bcrypt.compare(password, hasPassword)
}
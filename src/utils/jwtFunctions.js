import jwt from "jsonwebtoken"
import { envConfig } from "../config/env.config.js"

const {JWT_SECRET} = envConfig

export const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:"30m"})
    return token
}


export const verifyToken = (token) => {

    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        return decoded
    } catch (error) {
        throw new Error(`Invalid token: ${error}`)
    }

}  
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@config/index"

export const generateToken = (email: string, id: string | unknown): string => {
    return jwt.sign({ email, id },
        JWT_SECRET as string)
}

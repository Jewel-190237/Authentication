
import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import bcrypt from 'bcrypt';
import config from "../../config";
import User from "../user/user.model";

export class AuthService {
    static async updatePassword(
        _id: string,
        payload: any,
    ) {
        if (payload.password !== payload.confirm_password) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Bad request',
                'Password and confirm password does not match!',
            );
        }

        const hasPassword = await bcrypt.hash(
            payload.password as string,
            Number(config.bcrypt_salt_rounds)
        )

        await User.findByIdAndUpdate(_id,{
            $set: {password: hasPassword}
        }
            
        )
    }
}
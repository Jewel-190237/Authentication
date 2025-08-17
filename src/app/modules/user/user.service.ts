import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import User from "./user.model";

export class UserService {
   static async createNewUser(payload: any) {
      const newUser = await User.create(payload)

      if (!newUser) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request Failed',
            'Failed to create account! Please try again.'
         )
      }
      return newUser
   }
}
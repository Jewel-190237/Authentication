import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import User from "./user.model";
import { Types } from "mongoose";
import { TUser } from "./user.interface";

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

   static async updateUserProfile(
      query: Record<string, string | Types.ObjectId>,
      updatedDocuments: Partial<TUser>,
      session = undefined,
   ) {
      const option = {
         new: true,
         runValidators: true,
         session
      }

      const updatedUser = await User.findOneAndUpdate(
         query,
         updatedDocuments,
         option,
      ).lean()
      return updatedUser
   }
}
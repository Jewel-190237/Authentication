import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import { Types } from "mongoose";

export class UserService {
   static async createNewUser(user: Partial<TUser>) {
      console.log("user service in here")
      const newUser = await User.create(user)
      console.log("🚀 ~ UserService ~ createNewUser ~ newUser:", newUser)
      if (!newUser) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request Failed',
            'Failed to create account! Please try again.'
         )
      }
      return newUser
   }

   static async findUserById(_id: string | Types.ObjectId) {
      const user = await User.findById(_id)
      if (!user) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'User not found!',
         );
      }
      return user;
   }

   static async findUserByIdentifier(identifier: string) {
      const user = await User.findOne({ identifier: identifier })
      // if (!user) {
      //    throw new AppError(
      //       HttpStatusCode.NotFound,
      //       'Request Failed',
      //       'User not found!',
      //    );
      // }
      return user;
   }

   static async updateUserProfle({ query, updatedDocuments }: { query: Record<string, string | Types.ObjectId>, updatedDocuments: Partial<TUser> }) {
      const option = {
         new: true,
         runValidators: true,
      }

      const updatedUser = await User.findOneAndUpdate(
         query,
         updatedDocuments,
         option
      )
      return updatedUser
   }
}
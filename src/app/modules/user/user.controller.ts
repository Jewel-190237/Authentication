import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync"
import { OTPService } from "../otp/otp.service";
import AppError from "../../errors/AppError";
import dayjs from "dayjs";
import { TOTP } from "../otp/otp.interface";
import { UserService } from "./user.service";
import { createToken } from "../auth/auth.utils";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

export class UserController {
   static createUser = catchAsync(async (req, res) => {
      const { body } = req.body
      const query = {
         identifier: body.identifier,
         otp: body.otp
      }

      let code: TOTP | null;

      code = await OTPService.findOTPByIdentifier(query)

      if (!code) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'verification failed',
            'invalid or expire otp'
         )
      }

      const startTime = dayjs(code.createdAt)
      const endTime = dayjs(Date.now());
      const expireTimeInMinutes = endTime.diff(startTime, 'minutes')

      if (expireTimeInMinutes >= 20) {
         throw new AppError(
            400,
            'Invalid request',
            'OTP expired! Please try again.',
         );
      }

      if (code && code.attempts > 0 && code.otp === body.otp) {
         console.log("🚀 ~ UserController ~ newUser:")
         const newUser = await UserService.createNewUser(body)
         console.log("🚀 ~ UserController ~ newUser:", newUser)

         const tokenPayload: any = {
            _id: newUser?._id,
            name: newUser?.name,
            email: newUser?.identifier,
            phone: newUser?.phone,
            role: 'user',
         };

         const accessToken = createToken(
            tokenPayload,
            config.jwt_access_secret as string,
            config.jwt_access_expires_in as string,
         )

         sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "user created Successfully",
            data: accessToken
         })
      }
      if (code) {
         code.attempts -= 1;
         //@ts-ignore
         await code.save();
      }
   })

   static updateUserProfile = catchAsync(async (req, res) => {
      const { body } = req.body
      const { _id } = res.locals.user
      const query = { _id: _id }
      const user = await UserService.findUserById(_id)
      if (!user) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'user not found',
            'user not found in this id'
         )
      }

      const updatedUser = await UserService.updateUserProfle({ query: query, updatedDocuments: body })
      sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'Profile updated successfully',
         data: undefined
      });
   })
}
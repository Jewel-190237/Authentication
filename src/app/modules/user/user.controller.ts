import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { OTPService } from "../otp/otp.service";
import dayjs from "dayjs";
import { UserService } from "./user.service";
import { createToken } from "../auth/auth.utils";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
export class UserComtroller {
   static createNewUser = catchAsync(async (req, res) => {
      const { body } = req.body;

      let code;

      code = await OTPService.findOTPByEmail({
         email: body.email,
         otp: body.otp
      })
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

      if (expireTimeInMinutes >= 2) {

         throw new AppError(
            400,
            'Invalid request',
            'OTP expired! Please try again.',
         );
      }

      if (code && code.attempts > 0 && code.otp === body.otp) {
         const newUser = await UserService.createNewUser(body)

         const tokenPayload: any = {
            _id: newUser?._id,
            name: newUser?.name,
            email: newUser?.email,
            phone: newUser?.phone,
            role: newUser?.role,
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
   })

   static updateUserProfile = catchAsync(async (req, res) => {
      const { body } = req.body;
      const { id } = req.params;

      if (!id) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            "Invalid Request",
            "User ID is required"
         );
      }

      const disallowedFields = ["password", "role", "is_deleted"];
      for (const field of disallowedFields) {
         if (body[field] !== undefined) {
            throw new AppError(
               HttpStatusCode.BadRequest,
               "Invalid Update",
               `${field} cannot be updated directly`
            );
         }
      }

      const updatedUser = await UserService.updateUserProfile(
         { _id: id },
         body,
      );


      if (!updatedUser) {
         throw new AppError(
            HttpStatusCode.NotFound,
            "Not Found",
            "User not found"
         );
      }

      sendResponse(res, {
         success: true,
         statusCode: httpStatus.OK,
         message: "User profile updated successfully",
         data: updatedUser,
      });
   })
}
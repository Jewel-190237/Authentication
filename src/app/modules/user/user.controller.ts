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
      if (code) {
            code.attempts -= 1;
            //@ts-ignore
            await code.save();
        }
   })
}
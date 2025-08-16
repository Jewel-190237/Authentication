import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { OTPService } from "../otp/otp.service";
import dayjs from 'dayjs';
import { UserService } from "./user.service";
import config from "../../config";
import { createToken } from "../auth/auth.utils";
import sendResponse from "../../utils/sendResponse";

export class UserController {
   static createNewUser = catchAsync(async (req, res) => {
      const { body } = req.body
      let otp;

      otp = await OTPService.findOneByEmail({
         email: body.idetifier,
         code: body.code,
         action: body.action
      })

      if (!otp) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'verification failed',
            'invalid or expire otp'
         )
      }

      const startTime = dayjs(otp.createdAt)
      const endTime = dayjs(Date.now());
      const expireTimeInMinutes = endTime.diff(startTime, 'minute')
      if (expireTimeInMinutes >= 2) {

         throw new AppError(
            400,
            'Invalid request',
            'OTP expired! Please try again.',
         );
      }

      if (otp && otp.attempst > 0 && body.code === otp.code) {
         const newUser = await UserService.createNewUser(body)

         const tokenPayload: any = {
            //@ts-ignore
            _id: newUser._id,
            //@ts-ignore
            name: newUser.name,
            //@ts-ignore
            email: newUser.email,
            //@ts-ignore
            phone: newUser.phone,
            //@ts-ignore
            role: newUser.role,
         };
         const accessToken = createToken(
            tokenPayload,
            config.jwt_access_secret as string,
            config.jwt_access_expires_in as string,
         );

         sendResponse(res, {
            statusCode: HttpStatusCode.Created,
            success: true,
            message: "User has been created successfuly",
            data: {
               accessToken
            }
         })
         return;
      }
      if (otp) {
         otp.attempts -= 1;
         await otp.save();
      }
      throw new AppError(
         HttpStatusCode.BadRequest,
         'Request Failed',
         'Invalid OTP! Please try again.',
      );

   })
}
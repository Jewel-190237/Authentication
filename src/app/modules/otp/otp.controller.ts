
import config from "../../config";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendUserEmail } from "../../utils/sendEmail";
import sendResponse from "../../utils/sendResponse";
import { checkValidEmail } from "../auth/auth.utils";
import { OTPService } from "./otp.service";
import { generateOTP } from "./otp.utils";
import httpStatus from 'http-status';

export class OTPController {
   static sendOTP = catchAsync(async (req, res) => {
      const { body } = req.body;
      const { identifier, action } = body;
      const validationResultEmail = checkValidEmail(identifier)

      if (!validationResultEmail) {
         throw new AppError(
            400,
            'Request Failed',
            'its not a valid Email, please try again with a valid email'
         )
      }
      if (action === 'signup') {
         //chech is user exixts, show already exits
      }
      else {
         // chech is user not exixts, user not found
      }
      const otpPayload = {
         email: validationResultEmail?.success ? identifier.toLowerCase().trim() : undefined,
         action: action
      }

      const isAlreadySendOTP = await OTPService.findOneByQuery(otpPayload)

      if (isAlreadySendOTP) {
         throw new AppError(
            400,
            'Request Failed',
            'OTP already send. Please wait and try again.',
         );
      }

      const OTP = generateOTP(6)

      const data = {
         email: identifier?.toLowerCase().trim() as string,
         subject: `${config.website_name ? config.website_name + ': ' : ''}OTP verification code`,
         message: `<h3>Your verification OTP code is: </h3>
                       <div style="background-color: azure; margin: 01px 0px; padding: 5px">
                           <h3 style="margin-inline-start: 5px; letter-spacing: 3px;">
                            ${OTP}
                            </h3>
                       </div>
                       <h3>For any kind of help, please contact our support team.</h3>
                       Sincerely,
                       <br/>
                       ${config.website_name} | Contact No. 01980445424
                    `,
      };
      await sendUserEmail(data);
      await OTPService.postOTPByEmail({
         email: otpPayload.email,
         code: OTP,
         action: otpPayload.action
      })

      sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'OTP send, plese check your email',
         data: {
            email: identifier,
            otp: OTP
         }
      })
   })

}
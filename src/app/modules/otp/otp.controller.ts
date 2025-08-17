import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { checkValidEmail } from "../auth/auth.utils";
import { OTPService } from "./otp.service";
import { generateOTP } from "./otp.utils";
import config from "../../config";
import { sendUserEmail } from "../../utils/sendEmail";
import sendResponse from "../../utils/sendResponse";

export class OTPComtroller {
   static sentOTP = catchAsync(async (req, res) => {
      const { body } = req.body
      const { identifier, action } = body

      const isEmailvalid = checkValidEmail(identifier);
      if (!isEmailvalid) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request Failed',
            'Invalid Email, please input a valid Email'
         )
      }
      let user = null
      if (action === 'signup') {
         user = await OTPService.findUserByEmail(identifier)
         if (user) {
            throw new AppError(
               HttpStatusCode.BadRequest,
               'Request Failed',
               'User already Exixts, please login'
            )
         }
      }
      else {
         user = await OTPService.findUserByEmail(identifier)
         if (!user) {
            throw new AppError(
               HttpStatusCode.BadRequest,
               'Request Failed',
               'No User found in this account, please register first to login'
            )
         }
      }

      const optPayload = {
         email: isEmailvalid.success ? identifier.toLowerCase().trim() : undefined,
         action: action
      }

      const isAlreadySendOTP = await OTPService.findOTPByEmail(optPayload)

      if (isAlreadySendOTP) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request Failed',
            'Invalid or Expire OTP'
         )
      }

      const otp = generateOTP(7)
      const data = {
         email: identifier?.toLowerCase().trim() as string,
         subject: `${config.website_name ? config.website_name + ': ' : ''}OTP verification code`,
         message: `<h3>Your verification OTP code is: </h3>
                       <div style="background-color: azure; margin: 01px 0px; padding: 5px">
                           <h3 style="margin-inline-start: 5px; letter-spacing: 3px;">
                            ${otp}
                            </h3>
                       </div>
                       <h3>For any kind of help, please contact our support team.</h3>
                       Sincerely,
                       <br/>
                       ${config.website_name} | Contact No. 01980445424
                    `,
      };

      await sendUserEmail(data)
      await OTPService.postOTPByEmail({
         email: identifier,
         otp: otp,
         action: action
      })
      sendResponse(res, {
         success: true,
         message: `OTP Send seccessfully, please check to ${identifier}`,
         statusCode: HttpStatusCode.Created,
         data: {
            identifier,
            otp
         }
      })
   })
}

import AppError from "../../errors/AppError"
import { catchAsync } from "../../utils/catchAsync"
import { validEmailCheck } from "../auth/auth.utils"
import { OTPService } from "./otp.service"
import { generateOTP } from "./otp.utils"
import config from "../../config"
import { sendUserEmail } from "../../utils/sendEmail"
import sendResponse from "../../utils/sendResponse"
import httpStatus from 'http-status';

export class OTPController {
  static sentOTP = catchAsync(async (req, res) => {
    const { body } = req.body
    const { identifier, action } = body
    const validationResult = validEmailCheck(identifier)

    if (action === 'signup') {
      // check user exixts in this identifier
    }
    else {
      // check user exixts in this identifer
    }

    const otpPayload = {
      identifier: validationResult.success
        ? identifier?.toLowerCase().trim()
        : identifier?.trim(),
      action,
    };

    const isAlreadySend = await OTPService.findOTPByQuery(otpPayload)
    if (isAlreadySend) {
      throw new AppError(
        400,
        'Request Failed',
        'OTP already send. Please wait and try again.',
      );
    }

    const otp = generateOTP(7)

    if (validationResult.success) {
      const data = {
        email: otpPayload.identifier,
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

      await sendUserEmail(data);
      const otpdata = await OTPService.postOTPByEmail({
        identifier: otpPayload.identifier,
        otp: otp,
        action: otpPayload.action
      })
      console.log("🚀 ~ OTPController ~ otpdata:", otpdata)
    }
    else {
      // form SMS
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `The verification OTP was sent to your ${validationResult.success ? 'email address.' : 'phone number.'}`,
      data: {
        type: validationResult.success ? 'email' : 'phone',
        identifier: identifier.trim(),
        otp: otp
      },
    });
  })
}
import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import OTP from "./otp.model";

export class OTPService {
   static async postOTPByEmail({ email, code, action }: { email: string, code: string, action: string }): Promise<void> {
      await OTP.crate({
         email: email.toLowerCase().trim(),
         code: code,
         action: action
      })
   }

   static async findOneByQueary(queary: any): Promise<any> {
      const otp = await OTP.findOne(queary)
      if (!otp) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'Invalid or Expired OTP!'
         )
      }
      return otp;
   }
}
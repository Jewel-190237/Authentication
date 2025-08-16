import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import OTP from "./otp.model";

export class OTPService {
   static async postOTPByEmail({ email, code, action }: { email: string, code: string, action: string }): Promise<void> {
      await OTP.create({
         email: email.toLowerCase().trim(),
         code: code,
         action: action
      })
   }

   // Use when you want OTP (verification step)
   static async findOneByQueryOrFail(query: any): Promise<any> {
      const otp = await OTP.findOne(query)
      if (!otp) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'Invalid or Expired OTP!'
         )
      }
      return otp;
   }

   // Use when you just want to check if OTP exists
   static async findOneByQuery(query: any): Promise<any | null> {
      return await OTP.findOne(query);
   }
}
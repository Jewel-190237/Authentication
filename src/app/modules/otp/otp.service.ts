import { TOTP } from "./otp.interface";
import OTP from "./otp.model";

export class OTPService {
   static async postOTPByEmail({ email, otp, action }: { email: string, otp: string, action: string }): Promise<void> {
      await OTP.create({
         email: email.toLowerCase().trim(),
         otp: otp.trim(),
         action: action.toLowerCase()
      })
   }

   // Use when you just want to check if OTP exists
   static async findOTPByEmail(queary: Partial<TOTP>): Promise<TOTP | null> {
      return await OTP.findOne(queary)
   }
}
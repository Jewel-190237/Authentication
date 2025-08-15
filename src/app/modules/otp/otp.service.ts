import OTP from "./otp.model";

export class OTPService {
   static async postOTPByEmail({ email, code, action }: { email: string, code: string, action: string }): Promise<void> {
      await OTP.crate({
         email: email.toLowerCase().trim(),
         code: code,
         action: action
      })
   }
}
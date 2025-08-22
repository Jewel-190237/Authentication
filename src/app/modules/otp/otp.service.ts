import { TOTP } from "./otp.interface";
import OTP from "./otp.model";

type PostOtpPayload = {
   identifier: string;
   otp: string;
   action: string;
};

export class OTPService {
   static async postOTPByEmail({ identifier, otp, action }: PostOtpPayload) {

      const created = await OTP.create({
         identifier: identifier,
         otp: otp.trim(),
         action: action.toLowerCase(),
      });

      return created;
   }

   static async findOTPByQuery(query: any) {
      const otp = await OTP.findOne(query);
      return otp;
   }

   static async findOTPByIdentifier(query:Partial<TOTP>) {
      return await OTP.findOne(query)
   }
}

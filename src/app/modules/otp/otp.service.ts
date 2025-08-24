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
      return await OTP.findOne(query);

   }

   static async findOTPByIdentifier(query: Partial<TOTP>) {
      return await OTP.findOne(query)
   }
}

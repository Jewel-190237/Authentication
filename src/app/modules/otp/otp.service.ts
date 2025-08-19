import OTP from "./otp.model";

type PostOtpPayload = {
  identifier: string;
  otp: string;
  action: string;
};

export class OTPService {
  static async postOTPByEmail({ identifier, otp, action }: PostOtpPayload) {
    const normalizedIdentifier = identifier.includes("@")
      ? identifier.toLowerCase().trim()
      : identifier.trim();

    const created = await OTP.create({
      identifier: normalizedIdentifier,
      otp: otp.trim(),
      action: action.toLowerCase(),
    });

    return created;
  }

  static async findOTPByQuery(query: any) {
    const otp = await OTP.findOne(query);
    return otp; 
  }
}

import OTP from "./otp.model";

export class OTPService {
  static async postOTP(identifier: string, otp: string, action: string) {
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
}

export type TOTP = {
    email: string,
    otp: string,
    action: string,
    attempts: number;
    expireAt: Date;
}
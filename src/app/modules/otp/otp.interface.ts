export type TOTP = {
    email: string,
    code: string,
    action: string,
    attempts: number;
    expireAt: Date;
}
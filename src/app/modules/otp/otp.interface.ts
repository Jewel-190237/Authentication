import { Dayjs } from "dayjs";

export type TOTP = {
   createdAt: string | number | Date | Dayjs | null | undefined;
   email: string,
   otp: string,
   action: string,
   attempts: number;
   expireAt: string | number | Date | Dayjs;
}
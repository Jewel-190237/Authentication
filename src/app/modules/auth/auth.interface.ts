import { Types } from "mongoose";

export type TTokenPayload = {
    _id: Types.ObjectId | undefined;
    name: string;
    email: string | undefined;
    phone: string | undefined;
}
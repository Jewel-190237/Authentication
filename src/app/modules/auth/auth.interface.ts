import { Types } from 'mongoose';

export type TTokenPayload = {
    _id: Types.ObjectId | undefined;
    name: string;
    role?: string;
    identifier: string | undefined;
};

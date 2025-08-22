import { Types } from 'mongoose';
export type TUser = {
    name: string;
    identifier?: string | undefined | null;
    password: string;
    image?: string;
    role: string;
    country?: string;
    city?: string;
    state?: string;
    zip_code: number;
    address?: string;
    about?: string;
    permissions?: Types.ObjectId;
    fcm_token: string[];
    push_notification_status: boolean;
    is_deleted: boolean;
    isModified: (field: string) => boolean;
};



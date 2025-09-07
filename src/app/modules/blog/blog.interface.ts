import { Types } from "mongoose";

export type TBlog = {
    _id?: Types.ObjectId;
    title: string;
    slug: string;
    content: string;
    author: Types.ObjectId | string;
    image?: string;
    tags?: string[];
    category?: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

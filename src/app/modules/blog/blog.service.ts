import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

export class BlogService {
   static async createBlog(payload: Partial<TBlog>) {
      const data = await Blog.create(payload)
      if (!data) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request failed !',
            'Failed to create blog ! Please check all the fields and try again',
         );
      }
      return data;
   }
}
import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

export class BlogController {
   static createBlog = catchAsync(async (req, res) => {
      const { body } = req.body
      const { _id } = res.locals.user

      const blog = await BlogService.createBlog({ ...body, author: _id })
      sendResponse(res, {
         statusCode: HttpStatusCode.Created,
         success: true,
         message: 'Blog created successfully',
         data: blog,
      });
   })
}
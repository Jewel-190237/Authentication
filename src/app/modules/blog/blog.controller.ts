import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.service";
import AppError from "../../errors/AppError";

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

   static getAllBlog = catchAsync(async (req, res) => {
      const { query }: any = req
      const filter: any = {}

      if (query.search) {
         filter['title'] = {
            $regex: new RegExp(query.search, 'i')
         }
      }

      if (query._id) {
         const blog = await BlogService.findBlogById(query._id);

         if (!blog) {
            throw new AppError(
               HttpStatusCode.BadRequest,
               'Request Failed !',
               "Blog can't exists",
            );
         }

         sendResponse(res, {
            statusCode: HttpStatusCode.Found,
            success: true,
            message: 'Blog retrieved successfully',
            data: blog,
         });
      }

      const select = {
         __v: 0,
         updatedAt: 0,
      };

      const blog = await BlogService.getAllBlogWithPagination(
         filter,
         query,
         select,
      );
      sendResponse(res, {
         statusCode: HttpStatusCode.Created,
         success: true,
         message: 'Blog list get successfully',
         data: blog,
      });

   })
}
import { HttpStatusCode } from 'axios';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import AppError from '../../errors/AppError';
import { Types } from 'mongoose';

export class BlogController {
    static createBlog = catchAsync(async (req, res) => {
        const { body } = req.body;
        const { _id } = res.locals.user;

        const blog = await BlogService.createBlog({ ...body, author: _id });
        sendResponse(res, {
            statusCode: HttpStatusCode.Created,
            success: true,
            message: 'Blog created successfully',
            data: blog,
        });
    });

    static getAllBlog = catchAsync(async (req, res) => {
        const { query }: any = req;
        const filter: any = {};

        if (query.isPublished !== undefined) {
            filter['isPublished'] = query.isPublished === 'true';
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
    });

    static updateBlog = catchAsync(async (req, res) => {
        const { _id } = req.params as { _id?: string };
        const { body } = req.body;

        if (!_id) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Request Failed !',
                'Blog id is required!',
            );
        }

        const objectId = new Types.ObjectId(_id);

        const exist = await BlogService.findBlogById(objectId);
        if (!exist) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Request Failed !',
                'Blog not found !',
            );
        }

        const data = await BlogService.updateBlog({ _id: _id }, body);
        sendResponse(res, {
            statusCode: HttpStatusCode.Ok,
            success: true,
            message: 'Blog updated successfully',
            data: data,
        });
    });

    static deleteBlog = catchAsync(async (req, res) => {
        const { _id } = req.params;

        if (!_id) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Request Failed !',
                'Blog id is required!',
            );
        }

        const exist = await BlogService.findBlogById(_id);
        if (!exist) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Request Failed !',
                'Blog not found !',
            );
        }

        await BlogService.deleteBlog(_id);
        sendResponse(res, {
            statusCode: HttpStatusCode.Ok,
            success: true,
            message: 'Blog deleted successfully',
            data: undefined,
        });
    });
}

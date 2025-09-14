import { HttpStatusCode } from 'axios';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { Types } from 'mongoose';

export class BlogService {
    static async createBlog(payload: Partial<TBlog>) {
        const data = await Blog.create(payload);
        if (!data) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Request failed !',
                'Failed to create blog ! Please check all the fields and try again',
            );
        }
        return data;
    }

    static async findBlogById(_id: string | Types.ObjectId) {
        const data = await Blog.findById(_id)
            .populate({ path: 'author', select: 'name image' })
            .select('-updatedAt -__v');

        if (!data) {
            throw new AppError(
                HttpStatusCode.NotFound,
                'Request failed !',
                'Blog not found ! Please check blog id and try again',
            );
        }
        return data;
    }

    static async getAllBlogWithPagination(
        filter: Record<string, string | boolean | number>,
        query: Record<string, string | boolean | number>,
        select: Record<string, string | boolean | number>,
    ) {
        const aggregate: any[] = [
            { $match: filter },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'author',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                image: 1,
                            },
                        },
                    ],
                    as: 'author',
                },
            },
            {
                $unwind: {
                    path: '$author',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ];

        // ✅ Apply search here (after author is available)
        if (query.search) {
            const regex = new RegExp(query.search as string, 'i');
            aggregate.push({
                $match: {
                    $or: [
                        { title: { $regex: regex } },
                        { slug: { $regex: regex } },
                        { content: { $regex: regex } },
                        { 'author.name': { $regex: regex } }, // 👈 search in author
                    ],
                },
            });
        }

        aggregate.push({
            $project: select,
        });

        const option = {
            page: +query.page || 1,
            limit: +query.limit || 10,
            sort: { createdAt: -1 },
        };

        return await Blog.aggregatePaginate(aggregate, option);
    }
}

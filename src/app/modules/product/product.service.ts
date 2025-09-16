import { HttpStatusCode } from 'axios';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { Types } from 'mongoose';

export class ProductService {
   static async createProduct(payload: Partial<TProduct>) {
      const product = await Product.create(payload)
      if (!product) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed !',
            'Failed to create blog ! Please check all the fields and try again'
         )
      }
      return product
   }

   static async findProductById(_id: string | Types.ObjectId) {
      const data = await Product.findById(_id)
      if (!data) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed !',
            'Product is not found'
         )
      }
      return data
   }

   static async getAllBlogWithPagination(
      filter: Record<string, string | boolean | number>,
      query: Record<string, string | boolean | number>,
      select: Record<string, string | boolean | number>,
   ) {

      const aggregate: any[] = [
         {
            $match: filter,
         },
         {
            $lookup: {
               from: 'users',
               foreignField: '_id',
               localField: 'author',
               pipeline: [
                  {
                     $project: {
                        _id: 1,
                        name: 1,
                        image: 1
                     },
                  },
               ],
               as: 'author',
            }
         },
         {
            $unwind: {
               path: '$author',
               preserveNullAndEmptyArrays: true
            }
         },
      ]

      if (query.search) {
         const regex = new RegExp(query.search as string, 'i')

         aggregate.push({
            $match: {
               $or: [
                  { title: { $regex: regex } },
                  { name: { $regex: regex } },
                  { content: { $regex: regex } }
               ]
            }
         })
      }
      aggregate.push({
         $project: select
      })

      const option = {
         page: +query.page || 1,
         limit: +query.limit || 10,
         sort: { createdAt: -1 }
      }

      return await Product.aggregatePaginate(aggregate, option)

   }
}

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

   static async findAllBlogWithPagination(
      filter: Record<string, string | boolean | number>,
      query: Record<string, string | boolean | number>,
      select: Record<string, string | boolean | number>,
   ) {

      const aggregate: any[] = [
         {
            $match: filter,
         },
      ]

      if (query.search) {
         const regex = new RegExp(query.search as string, 'i')

         aggregate.push({
            $match: {
               $or: [
                  { name: { $regex: regex } },
                  { description: { $regex: regex } }
               ]
            }
         })
      }

      if (query.maxPrice || query.minPrice) {
         const priceFilter: any = {}

         if (query.maxPrice) {
            priceFilter.$lte = Number(query.maxPrice)
         }

         if (query.minPrice) {
            priceFilter.$gte = Number(query.minPrice)
         }

         aggregate.push({
            $match: {
               price: priceFilter
            }
         })
      }



      aggregate.push({
         $project: select,
      })

      const option = {
         page: +query.page || 1,
         limit: +query.limit || 10,
         sort: { createdAt: -1 },
      }

      return await Product.aggregatePaginate(aggregate, option)

   }

   static async updateProduct(
      query: Record<string, string | Types.ObjectId>,
      updatedDocuments: Partial<TProduct>,
      section = undefined,
   ) {
      const options = {
         section: section,
         new: true,
      };

      const data = await Product.findOneAndUpdate(query, updatedDocuments, options)
      if (!data) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request failed !',
            'Can not update  product ! please try again',
         );
      }

      return data;
   }
}

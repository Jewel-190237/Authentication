import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";
import { Types } from "mongoose";

export class CartService {
   static async createCartIntoDB(payload: Partial<TCart>) {
      const data = await Cart.create(payload)
      if (!data) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request failed',
            'Something wrong to post cart, please try again'
         )
      }
      return data;
   }

   static async findCartByQuery(query: Record<string, string | boolean | number>) {
      const data = await Cart.findOne(query)
         .select('-updatedAt -__v')
         .populate({ path: 'user', select: 'name image' })

      return data;
   }

   static async findCartById(_id: Types.ObjectId | string) {
      const data = await Cart.findById(_id).populate({ path: 'user', select: 'name image' }).lean()
      if (!data) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request failed !',
            'Cart not found ! please check your cart id and try again.',
         );
      }
      return data;
   }

   static async findCartWithPagination(
      query: Record<string, string | boolean | number>,
      filter: Record<string, string | boolean | number>,
      select: Record<string, string | boolean | number>,
   ) {
      const aggregate: any[] = [
         { $match: filter },
         {
            $lookup: {
               from: 'users',
               foreignField: '_id',
               localField: 'user',
               pipeline: [
                  {
                     $project: {
                        _id: 1,
                        name: 1,
                        image: 1,
                     }
                  }
               ],
               as: 'user'
            }
         },
         {
            $unwind: {
               path: '$user',
               preserveNullAndEmptyArrays: true
            }
         },

         {
            $lookup: {
               from: 'products',
               foreignField: '_id',
               localField: 'product',
               pipeline: [
                  {
                     $project: {
                        _id: 1,
                        name: 1,
                        image: 1
                     }
                  }
               ],
               as: 'products'
            }
         },
         {
            $unwind: {
               path: '$products',
               preserveNullAndEmptyArrays: true
            }
         }

      ]

      if (query.search) {
         const regex = new RegExp(query.search as string, 'i')
         aggregate.push({
            $match: {
               $or: [
                  { 'products.name': { $regex: regex } },
                  { 'user.name': { $regex: regex } }
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

      return await Cart.aggregatePaginate(aggregate, option)
   }

   static async findCartCalculation(filter: Record<string, string | Types.ObjectId>) {
   const aggregate: any = [
      { $match: filter }, 
      {
         $lookup: {
            from: 'products',      
            localField: 'product', 
            foreignField: '_id',
            as: 'productDetails'
         }
      },
      { $unwind: '$productDetails' }, 
      {
         $group: {
            _id: '$user',
            totalQuantity: { $sum: '$quantity' },
            totalPrice: { $sum: { $multiply: ['$quantity', '$productDetails.price'] } }
         }
      }
   ];

   const result = await Cart.aggregate(aggregate);

   return result[0] || { totalQuantity: 0, totalPrice: 0 };
}

}
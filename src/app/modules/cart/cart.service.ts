import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";

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
         .populate({path:'user', select:'name image'})
      if (!data) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request failed',
            'Something wrong to post cart, please try again'
         )
      }
      return data;
   }
}
import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { CartService } from "./cart.service";
import { ObjectId } from 'mongodb';
import { ProductService } from "../product/product.service";
import sendResponse from "../../utils/sendResponse";
export class CartController {
   static postCart = catchAsync(async (req, res) => {
      const { body } = req.body;
      const { user } = res.locals;

      if (!body.product) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'Product is required'
         )
      }

      const cartFilter = {
         product: new ObjectId(body.product),
         user: new ObjectId(user._id)
      }

      const cart = await CartService.findCartByQuery(cartFilter as any);

      const quantity: number = body.quantity + (cart ? cart.quantity : 0);
      const productFilter = {
         _id: new ObjectId(body.product),
         quantity: {
            $gte: quantity
         }
      }

      const exists = await ProductService.findProductById(body.product)
      if (!exists) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'The product does not have sufficient quantity.'
         )
      }

      const product = await ProductService.findProductByQuery(productFilter as any)

      if (!product) {
         throw new AppError(
            HttpStatusCode.NotFound,
            'Request Failed',
            'The product does not have sufficient quantity.'
         )
      }

      if (cart) {
         cart.quantity = quantity;
         await cart.save()
      }
      else {
         await CartService.createCartIntoDB({ ...body, user: user._id })
      }

      sendResponse(res, {
         statusCode: HttpStatusCode.Created,
         success: true,
         message: 'Cart updated successfully',
         data: undefined
      })
   })
}
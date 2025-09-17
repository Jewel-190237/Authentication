import { HttpStatusCode } from 'axios';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';
import AppError from '../../errors/AppError';

export class ProductController {
   static createProduct = catchAsync(async (req, res) => {
      const { body } = req.body;
      const product = await ProductService.createProduct(body);
      sendResponse(res, {
         statusCode: HttpStatusCode.Created,
         success: true,
         message: 'Product created successfully',
         data: product,
      });
   });

   static getAllProductsWithPagination = catchAsync(async (req, res) => {
      const { query }: any = req
      const filter: any = {}

      if (query.status != undefined) {
         filter['status'] = query.status === 'true'
      }

      if (query._id) {
         const data = await ProductService.findProductById(query._id as string);

         if (!data) {
            throw new AppError(
               HttpStatusCode.BadRequest,
               'Request Failed !',
               "Product can't exists",
            );
         }

         sendResponse(res, {
            statusCode: HttpStatusCode.Found,
            success: true,
            message: 'Product retrieved successfully',
            data: data,
         });
      }

      const select = {
         __v: 0,
         updatedAt: 0,
      };

      const products = await ProductService.findAllBlogWithPagination(filter, query, select)
      sendResponse(res, {
         statusCode: HttpStatusCode.Created,
         success: true,
         message: 'Product list get successfully',
         data: products,
      });
   })

   static updateProduct = catchAsync(async (req, res) => {
      const { body } = req.body
      const { _id } = req.params

      if (!_id) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request Failed !',
            'Product id is required!',
         );
      }

      const exist = await ProductService.findProductById(_id);
      if (!exist) {
         throw new AppError(
            HttpStatusCode.BadRequest,
            'Request Failed !',
            'Blog not found !',
         );
      }

      const data = await ProductService.updateProduct({ _id: _id }, body)
      sendResponse(res, {
         success: true,
         statusCode: HttpStatusCode.Ok,
         message: 'Product updated successfully',
         data: data
      })
   })
}

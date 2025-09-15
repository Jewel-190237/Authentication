import { HttpStatusCode } from 'axios';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

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
}

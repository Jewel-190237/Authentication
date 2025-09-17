import { Router } from 'express';
import validate from '../../middleware/validate';
import { ProductValidation } from './product.validation';
import auth from '../../middleware/auth';
import { ProductController } from './product.controller';

const routes = Router();

routes.post(
    '/',
    validate(ProductValidation.productCreateValidationSchema),
    auth('admin'),
    ProductController.createProduct,
);

routes.get(
    '/get-all-product',
    auth('admin'),
    ProductController.getAllProductsWithPagination
)

routes.put(
    '/update-product/:_id',
    auth('admin'),
    validate(ProductValidation.productUpdateValidationSchema),
    ProductController.updateProduct
)

export const ProductRoutes = routes;
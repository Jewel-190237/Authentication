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

export const ProductRoutes = routes;
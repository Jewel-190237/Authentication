import { Router } from 'express';
import validate from '../../middleware/validate';
import { ProductValidation } from './product.validation';
import auth from '../../middleware/auth';
import { ProductController } from './product.controller';
import { USER_ROLE_ENUM } from '../../utils/constants';

const routes = Router();

routes.post(
    '/',
    validate(ProductValidation.productCreateValidationSchema),
    auth('admin'),
    ProductController.createProduct,
);

routes.get(
    '/get-all-product',
    auth(...USER_ROLE_ENUM),
    ProductController.getAllProductsWithPagination
)

routes.put(
    '/update-product/:_id',
    auth('admin'),
    validate(ProductValidation.productUpdateValidationSchema),
    ProductController.updateProduct
)

export const ProductRoutes = routes;
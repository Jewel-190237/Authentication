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

export const ProductRoutes = routes;
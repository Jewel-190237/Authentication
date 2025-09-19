import { Router } from "express";
import auth from "../../middleware/auth";
import validate from "../../middleware/validate";
import { cartValidation } from "./cart.validation";
import { CartController } from "./cart.controller";

const routes = Router();

routes.post(
    '/post-cart',
    auth('admin'),
    validate(cartValidation.postCartValidationSchema),
    CartController.postCart
)

routes.get(
    '/get-cart',
    auth('admin'),
    CartController.getCartByUserWithPagination
)

export const CartRoutes = routes;
import { Router } from "express";
import auth from "../../middleware/auth";
import validate from "../../middleware/validate";
import { cartValidation } from "./cart.validation";
import { CartController } from "./cart.controller";
import { USER_GENDER_ENUM, USER_ROLE_ENUM } from "../../utils/constants";

const routes = Router();

routes.post(
    '/post-cart',
    auth(...USER_ROLE_ENUM),
    validate(cartValidation.postCartValidationSchema),
    CartController.postCart
)

routes.get(
    '/get-cart',
    auth(...USER_ROLE_ENUM),
    CartController.getCartByUserWithPagination
)

export const CartRoutes = routes;
import { Router } from "express";
import validate from "../../middleware/validate";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const routes = Router()
routes.post(
    '/login',
    validate(AuthValidation.userLoginValidationSchema),
    AuthController.loginAccess
)

export const AuthRoutes: Router = routes
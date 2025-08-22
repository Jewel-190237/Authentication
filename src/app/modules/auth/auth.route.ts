import { Router } from "express";
import validate from "../../middleware/validate";
import { AuthValidation } from "./auth.validation";
import { AuhtController } from "./auth.controller";

const route = Router()

route.post(
    '/login',
    validate(AuthValidation.userLoginValidationSchema),
    AuhtController.login
)

export const AuthRoutes: Router = route

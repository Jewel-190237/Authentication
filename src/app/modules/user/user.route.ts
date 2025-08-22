import { Router } from "express";
import validate from "../../middleware/validate";
import { userValidationSchema } from "./user.validation";
import { UserController } from "./user.controller";

const routes = Router()
routes.post(
    '/register',
    validate(userValidationSchema.userRegistrationSchema),
    UserController.createUser
)

export const UserRoutes: Router = routes
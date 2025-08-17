import { Router } from "express";
import validate from "../../middleware/validate";
import { userValidationSchema } from "./user.validation";
import { UserComtroller } from "./user.controller";


const routes = Router()
routes.post(
    '/register',
    validate(userValidationSchema.userRegistrationSchema),
    UserComtroller.createNewUser
)

export const UserRoutes: Router = routes
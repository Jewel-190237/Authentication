import { Router } from "express";
import validate from "../../middleware/validate";
import { userValidationSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { USER_ROLE_ENUM } from "../../utils/constants";
import auth from "../../middleware/auth";

const routes = Router()
routes.post(
    '/register',
    validate(userValidationSchema.userRegistrationSchema),
    UserController.createUser
),
routes.patch(
    '/update-user-profile',
    auth(...USER_ROLE_ENUM),
    validate(userValidationSchema.updateUserProfileSchema),
    UserController.updateUserProfile
)

export const UserRoutes: Router = routes
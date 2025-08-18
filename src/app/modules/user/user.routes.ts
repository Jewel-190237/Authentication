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

routes.patch(
    '/profile/:id',
    validate(userValidationSchema.updateUserProfileSchema),
    UserComtroller.updateUserProfile
)

routes.patch(
    '/update_password/:id',
    validate(userValidationSchema.updatePasswordSchema),
    UserComtroller.updatePassword
)

export const UserRoutes: Router = routes
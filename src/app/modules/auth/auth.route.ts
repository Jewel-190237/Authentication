import { Router } from "express";
import validate from "../../middleware/validate";
import { AuthValidation } from "./auth.validation";
import { AuhtController } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../utils/constants";

const route = Router()

route.post(
    '/login',
    validate(AuthValidation.userLoginValidationSchema),
    AuhtController.login
)

route.post(
    '/forget-password/verify-otp/:id',
    validate(AuthValidation.forgetPasswordOtpVerify),
    AuhtController.forgetPasswordOTPVerify
)

route.post(
    '/forget-password/submit/:id',
    auth(...USER_ROLE_ENUM),
    validate(AuthValidation.forgetPasswordValidationSchema),
    AuhtController.setPasswordForForgetPassword
)

export const AuthRoutes: Router = route

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

route.post(
    '/forget-password/verify-otp/:id',
    validate(AuthValidation.forgetPasswordOtpVerify),
    AuhtController.forgetPasswordOTPVerify
)

route.post(
    '/forget-password/submit/:id',
    validate(AuthValidation.forgetPasswordOtpVerify),
    AuhtController.forgetPasswordOTPVerify
)

export const AuthRoutes: Router = route

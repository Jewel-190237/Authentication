import { Router } from "express";
import validate from "../../middleware/validate";
import { OTPValidation } from "./otp.validatio";
import { OTPController } from "./otp.controller";

const route = Router()
route.post(
    '/sendOTP',
    validate(OTPValidation.postValidationSchema),
    OTPController.sentOTP
)

export const OTPRoutes: Router = route;

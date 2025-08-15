import { Router } from "express";
import validate from "../../middleware/validate";
import { OTPValidationSchema } from "./otp.validation";
import { OTPController } from "./otp.controller";

const routes = Router();
routes.post(
    '/sentOTP',
    validate(OTPValidationSchema.postValidationSchema),
    OTPController.sendOTP
)

export const OTPRoutes: Router = routes;
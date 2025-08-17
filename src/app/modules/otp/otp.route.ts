import { Router } from "express";
import validate from "../../middleware/validate";
import { OTPValidationSchema } from "./otp.validation";
import { OTPComtroller } from "./otp.controller";


const routes = Router();
routes.post(
    '/sentOTP',
    validate(OTPValidationSchema.postValidationSchema),
    OTPComtroller.sentOTP
)

export const OTPRoutes: Router = routes;
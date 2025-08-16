import { catchAsync } from "../../utils/catchAsync";
import { OTPService } from "../otp/otp.service";


export class UserController {
   static createNewUser = catchAsync(async (req, res) => {
      const { body } = req.body
      let otp;

      otp = OTPService.findOneByEmail({
         email: body.idetifier,
         code: body.code,
         action: body.action
      })
   })
}
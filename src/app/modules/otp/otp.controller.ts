import { catchAsync } from "../../utils/catchAsync";

export class OTPController {
    static sendOTP = catchAsync(async (req, res) => {
        const { body } = req.body;
        const { identifier, action } = body
    })
}
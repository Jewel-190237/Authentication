import { catchAsync } from "../../utils/catchAsync";

export class CartController {
    static postCart = catchAsync(async (req, res) => {
        const { body } = req.body;
        const { user } = res.locals;
    })
}
import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";

export class CurtService {
    static async createCartIntoDB(payload: Partial<TCart>) {
        const data = await Cart.create(payload)
        if (!data) {
            throw new AppError(
                HttpStatusCode.BadRequest,
                'Request failed',
                'Something wrong to post cart, please try again'
            )
        }
        return data;
    }
}
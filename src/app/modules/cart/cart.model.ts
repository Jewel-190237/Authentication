import { model, Schema } from "mongoose";
import { TCart } from "./cart.interface";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const cartSchema = new Schema<TCart>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'user is required']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'product is required']
    },
    quantity: {
        type: Number,
        default: 0,
        required: [true, 'quantity is required']
    }
},
    {
        timestamps: true
    }
)

cartSchema.plugin(aggregatePaginate)

export const Cart = model<TCart>('cart', cartSchema)
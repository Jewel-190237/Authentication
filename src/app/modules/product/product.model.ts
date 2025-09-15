import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const schema = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
        },
        description: {
            type: String,
        },
        images: {
            type: [String],
        },
        quantity: {
            type: Number,
            required: [true, 'Product Quantity is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
        },
    },
    {
        timestamps: true,
    },
);

schema.plugin(aggregatePaginate);

export const Product = model<TProduct>('product', schema);

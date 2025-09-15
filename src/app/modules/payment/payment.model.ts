import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
    {
        productId: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, enum: ['BDT', 'USD'], default: 'BDT' },
        transactionId: { type: String, required: true, unique: true },
        status: {
            type: String,
            enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'],
            default: 'PENDING',
        },
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerPhone: { type: String, required: true },
    },
    { timestamps: true },
);

export const Payment = model<TPayment>('payment', paymentSchema);

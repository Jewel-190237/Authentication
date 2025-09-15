import { z } from 'zod';

export const paymentCreateValidationSchema = z.object({
    body: z.object({
        productId: z.string({
            required_error: 'Product ID is required',
            invalid_type_error: 'Product ID must be a string',
        }),
        amount: z.number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        }),
        currency: z.enum(['BDT', 'USD'], {
            required_error: 'Currency is required',
            invalid_type_error: 'Currency must be either BDT or USD',
        }),
        customerName: z.string({
            required_error: 'Customer name is required',
            invalid_type_error: 'Customer name must be a string',
        }),
        customerEmail: z
            .string({
                required_error: 'Customer email is required',
                invalid_type_error: 'Customer email must be a string',
            })
            .email('Invalid email address'),
        customerPhone: z.string({
            required_error: 'Customer phone is required',
            invalid_type_error: 'Customer phone must be a string',
        }),
    }),
});

export const PaymentValidation = {
    paymentCreateValidationSchema,
};

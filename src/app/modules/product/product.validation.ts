import { z } from 'zod';

const productCreateValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'product name must be string',
            required_error: 'product name is required',
        }),
        description: z
            .string({
                invalid_type_error: 'product description must be string',
                required_error: 'product description is required',
            })
            .optional(),

        images: z.array(
            z.string({
                invalid_type_error: 'images be a string',
                required_error: 'product image is required',
            }),
            {
                message: 'Images must be array',
            },
        ),
        price: z.number({
            invalid_type_error: 'price amount must be a number',
            required_error: 'Price is required',
        }),

        quantity: z.number({
            invalid_type_error: 'quantity amount must be a number',
            required_error: 'quantity is required',
        }),
    }),
});

export const ProductValidation = {
    productCreateValidationSchema,
};

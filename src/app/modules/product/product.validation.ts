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

const productUpdateValidationSchema = z.object({
   body: z.object({
      name: z
         .string({
            invalid_type_error: 'Product name must be a string',
         })
         .optional(),

      description: z
         .string({
            invalid_type_error: 'Product description must be a string',
         })
         .optional(),

      images: z
         .array(
            z.string({
               invalid_type_error: 'Image URL must be a string',
            }),
            {
               message: 'Images must be an array of strings',
            },
         )
         .optional(),

      price: z
         .number({
            invalid_type_error: 'Price amount must be a number',
         })
         .nonnegative('Price must be greater than or equal to 0')
         .optional(),

      quantity: z
         .number({
            invalid_type_error: 'Quantity must be a number',
         })
         .int('Quantity must be an integer')
         .nonnegative('Quantity cannot be negative')
         .optional(),

      status: z.enum(['active', 'inactive']).optional(),
   }),
});

export const ProductValidation = {
   productCreateValidationSchema,
   productUpdateValidationSchema
};

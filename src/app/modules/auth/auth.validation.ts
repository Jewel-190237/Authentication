import { z } from "zod";

const userLoginValidationSchema = z.object({
    body: z.object({
        identifier: z
            .string({
                invalid_type_error: 'User identifier must be a string',
                required_error: 'User identifier is required',
            }),

      password: z
            .string({
                invalid_type_error: 'User password must be string',
                required_error: 'User password is required',
            })
            .min(6, {
                message:
                    'Password must be greater than or equal to 6 characters',
            })
            .max(100, {
                message:
                    'Password must be less than or equal to 100 characters',
            })
            .trim(),
    }),
});

export const AuthValidation = {
    userLoginValidationSchema
}
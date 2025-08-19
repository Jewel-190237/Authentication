import { z } from "zod";

const userLoginValidationSchema = z.object({
   body: z.object({
      email: z
         .string({
            invalid_type_error: 'User identifier must be a string',
            required_error: 'User identifier is required',
         })
         .refine(
            (value) => {
               // Check if input matches email format or phone number format
               return (
                  /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ||
                  z.string().email().safeParse(value).success
               );
            },
            {
               message:
                  'User identifier must be a valid email or phone number',
            },
         ),
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
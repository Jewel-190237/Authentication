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

const forgetPasswordOtpVerify = z.object({
   body: z.object({
      otp: z.string({
         invalid_type_error: 'Otp must be string',
         required_error: 'Otp is required',
      }),
      identifier: z
         .string({
            invalid_type_error: 'Identifier must be a string',
            required_error: 'Identifier is required',
         }),
      action: z.enum(['forget_password', 'signup', 'profile_update'], {
         invalid_type_error: 'Action must be string',
         required_error: 'Action is required',
      }),
   }),
});

const forgetPasswordValidationSchema = z.object({
   body: z.object({
      password: z
         .string({
            invalid_type_error: 'Password must be string',
            required_error: 'Password is required',
         })
         .min(6, {
            message:
               'Password must be greater than or equal to 6 characters',
         })
         .max(100, {
            message:
               'Password must be less than or equal to 100 characters',
         }),
      confirm_password: z
         .string({
            invalid_type_error: 'Confirm password must be string',
            required_error: 'Confirm password is required',
         })
         .min(6, {
            message:
               'Password must be greater than or equal to 6 characters',
         })
         .max(100, {
            message:
               'Password must be less than or equal to 100 characters',
         }),
   }),
});

export const AuthValidation = {
   userLoginValidationSchema,
   forgetPasswordOtpVerify,
   forgetPasswordValidationSchema
}
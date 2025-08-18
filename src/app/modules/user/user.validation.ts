import mongoose from "mongoose";
import { z } from "zod";

const userRegistrationSchema = z.object({
   body: z.object({
      otp: z.string({
         invalid_type_error: 'OTP must be string',
         required_error: 'OTP is required',
      }).min(1, {
         message: 'OTP is required',
      }).trim(),

      name: z.string({
         invalid_type_error: 'User name must be string',
         required_error: 'User name is required',
      }).min(1, {
         message: 'User name is required',
      }).max(50, {
         message: 'Name must be less than or equal to 50 characters',
      }).trim(),

      email: z.string({
         invalid_type_error: 'User email must be string',
         required_error: 'User email is required',
      }).email({ message: 'Invalid email address' }).trim(),

      password: z.string({
         invalid_type_error: 'User password must be string',
         required_error: 'User password is required',
      }).min(6, {
         message:
            'Password must be greater than or equal to 6 characters',
      }).max(100, {
         message:
            'Password must be less than or equal to 100 characters',
      }).trim(),

      fcm_token: z.string({
         invalid_type_error: 'fcm_token must be string',
      }).optional(),
   }),
})

const updateUserProfileSchema = z.object({
   body: z.object({
      name: z.string({
         invalid_type_error: "User name must be string",
      })
         .min(1, { message: "User name is required" })
         .max(50, { message: "Name must be less than or equal to 50 characters" })
         .trim()
         .optional(),

      phone: z.string({
         invalid_type_error: "Phone must be string",
      })
         .min(6, { message: "Phone number must be at least 6 digits" })
         .max(20, { message: "Phone number must be less than or equal to 20 digits" })
         .trim()
         .optional(),

      image: z.string({
         invalid_type_error: "Image must be string",
      }).url("Image must be a valid URL")
         .optional(),

      country: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip_code: z.string().optional(),
      address: z.string().optional(),

   }),
});

const updatePasswordSchema = z.object({
   body: z.object({
      password: z.string({
         invalid_type_error: "Password must be string",
         required_error: "Password is required",
      }).min(6, {
         message: "Password must be greater than or equal to 6 characters",
      }).max(100, {
         message: "Password must be less than or equal to 100 characters",
      }),
      confirm_password: z.string({
         invalid_type_error: "Confirm password must be string",
         required_error: "Confirm password is required",
      }).min(6, {
         message: "Password must be greater than or equal to 6 characters",
      }).max(100, {
         message: "Password must be less than or equal to 100 characters",
      })
   })
});

export const userValidationSchema = {
   userRegistrationSchema,
   updateUserProfileSchema,
   updatePasswordSchema
}
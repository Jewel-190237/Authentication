import { z } from "zod";

const postValidationSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: 'Name is required',
         invalid_type_error: 'Name must be a string',
      }),
      email: z.string({
         required_error: 'Email is required',
         invalid_type_error: 'Email must be a string',
      })
      .email({
         message: 'Invalid email address',
      }),
      message: z.string({
         required_error: 'Message is required',
         invalid_type_error: 'Message must be a string',
      }),
   }),
});

export const ContactValidation = {
   postValidationSchema,
};
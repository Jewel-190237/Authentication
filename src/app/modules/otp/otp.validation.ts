import { z } from "zod";

const postValidationSchema = z.object({
   body: z.object({
      identifier: z.string({
         invalid_type_error: " must be string",
         required_error: "Identifier required",
      }).refine(
         (value) => {
            return (
               /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ||
               z.string().email().safeParse(value).success
            );
         }
      ),
      action: z.enum(['signup', 'forget_password', 'profile_setup'], {
         invalid_type_error: "Action must be string",
         required_error: "Action required"
      })

   })
})

export const OTPValidationSchema = {
   postValidationSchema
}
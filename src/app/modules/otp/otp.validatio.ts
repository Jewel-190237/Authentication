import { z } from "zod";

const postValidationSchema = z.object({
   body: z.object({
      identifier: z.string({ required_error: "Identifier required" }).refine(
         (val) =>
            /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val) || z.string().email().safeParse(val).success,
         { message: "Identifier must be a valid email or phone number" }
      ),
      action: z.enum(["signup", "forget_password", "profile_setup"], {
         invalid_type_error: "Action must be string",
         required_error: "Action required",
      }).refine(
         (value) => ["signup", "forget_password", "profile_setup"].includes(value),
         {
            message: "Action must be one of: signup, forget_password, profile_setup",
         }
      ),
   }),
});

export const OTPValidation = {
   postValidationSchema,
};

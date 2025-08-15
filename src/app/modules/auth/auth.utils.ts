import { z } from "zod"

export const checkValidEmail = (email: string) => {
   const schema = z.string().email()
   return schema.safeParse(email)
}
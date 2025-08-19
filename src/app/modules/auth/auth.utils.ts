import { z } from "zod"

export const validEmailCheck = (email: string) => {
   const schema = z.string().email()
   return schema.safeParse(email)
}
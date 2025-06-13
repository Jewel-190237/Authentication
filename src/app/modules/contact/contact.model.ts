import { model, Schema } from "mongoose";
import { TContact } from "./contact.interface";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const contactSchema = new Schema<TContact>({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
   },
   message: {
      type: String,
      required: true,
   },
   slug: {
      type: String
   }
})

contactSchema.plugin(mongooseAggregatePaginate);

export const Contact = model<TContact>("Contact", contactSchema);
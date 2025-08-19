import { model, Schema } from "mongoose";
import { TOTP } from "./otp.interface";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const schema = new Schema<TOTP>(
   {
      identifier: {
         type: String,
         require: true,
         trim: true,
         lowercase: true
      },
      otp: {
         type: String,
         required: true
      },
      action: {
         type: String,
         enum: ["signup", "forget_password", "update_profile"],
         required: true
      },
      attempts: {
         type: Number,
         default: 3
      },
      expireAt: {
         type: Date,
         default: Date.now,
         index: { expires: '2m' }
      }
   },
   { timestamps: true }
)

schema.plugin(mongooseAggregatePaginate)
const OTP = model<TOTP>('otps', schema);
export default OTP
import { model, Schema } from "mongoose";
import { TOTP } from "./otp.interface";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const schema = new Schema<TOTP>(
   {
      email: {
         type: String,
         trim: true,
         lowercase: true
      },
      code: {
         type: String,
         trim: true
      },
      action: String,
      attempts: {
         type: Number,
         default: 3
      },
      expireAt: {
         type: Date,
         default: () => new Date(Date.now() + 2 * 60 * 1000),
         expires: 0
      }
   },
   {
      timestamps: true
   }
)

schema.plugin(mongooseAggregatePaginate)

const OTP = model<TOTP>('otp', schema)
export default OTP;
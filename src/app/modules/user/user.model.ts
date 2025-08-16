import { model, Schema } from "mongoose";
// import { TUser } from "./user.interface";
import { USER_ROLE_ENUM } from "../../utils/constants";
import bcrypt from 'bcrypt';
import config from "../../config";
import { TUser } from "./user.interface";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const schema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Email is required"],
            unique: [true, "Email is already exixts"]
        },
        phone: {
            type: String,
            trim: true,
        },
        password: String,
        image: String,
        role: {
            type: String,
            enum: {
                values: USER_ROLE_ENUM,
                message: '{VALUE} is not a valid role',
            },
            default: 'user',
            required: true,
        },
        country: String,
        city: String,
        state: String,
        zip_code: String,
        address: String,
        permissions: {
            type: Schema.Types.ObjectId,
            ref: 'hrm_role',
        },
        fcm_token: [String],
        push_notification_status: {
            type: Boolean,
            default: true,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
)

schema.pre<TUser>('save', async function (next): Promise<void> {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(
            this.password,
            Number(config.bcrypt_salt_rounds),
        )
    }
    next();
})

schema.plugin(mongooseAggregatePaginate)
const User = model<TUser>('users', schema)
export default User;
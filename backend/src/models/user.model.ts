import mongoose from "mongoose";
import IUser from "../interface/user.interface.js";

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
    },
    {
        timestamps: true,

        toJSON: {
            transform(doc, ret) {
                const obj = ret as any;
                delete obj.password;
                delete obj.__v;
                obj.id = obj._id;
                delete obj._id;
                return obj;
            },
        },

        toObject: {
            transform(doc, ret) {
                // delete ret.password;
                // delete ret.__v;
                // ret.id = ret._id;
                // delete ret._id;
                // return ret;
            },
        },
    }
);

// index for performance
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
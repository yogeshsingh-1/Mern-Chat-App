import mongoose from "mongoose";
import IUser from "../interface/user.interface.js";

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
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
                const obj = ret as any;
                delete obj.password;
                delete obj.__v;
                obj.id = obj._id;
                delete obj._id;
                return obj;
            },
        },
    }
);

// index for performance
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
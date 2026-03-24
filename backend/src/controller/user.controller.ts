import { Request, Response, NextFunction } from "express";
import IUser from "../interface/user.interface.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

class UserController {
    // find AllUsers
    public findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser[] | null = await User.find({});
            if (!user) {
                return res.status(200).json({ status: true, data: [] })
            }
            return res.status(200).json({ status: true, data: user });
        } catch (e) {
            return next(e)
        }
    }
    // Get User By Id
    public userById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            // validate ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user id",
                });
            }
            const user: IUser | null = await User.findOne({ _id: id });
            if (!user) {
                return res.status(200).json({ status: true, data: null })
            }
            return res.status(200).json({ status: true, data: user });
        } catch (e) {
            return next(e)
        }
    }
}

export default UserController;
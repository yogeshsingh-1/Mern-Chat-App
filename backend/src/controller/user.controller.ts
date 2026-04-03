import { Request, Response, NextFunction } from "express";
import IUser from "../interface/user.interface.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import CustomError from "../utils/customerError.utils.js";

class UserController {
  // find AllUsers
  public findAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: IUser[] | null = await User.find({});
      if (!user) {
        return res.status(200).json({ success: true, data: [] });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (e) {
      return next(e);
    }
  };
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
      const user: IUser | null = await User.findOne({ email: id });
      if (!user) {
        return res.status(200).json({ success: true, data: null });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (e) {
      return next(e);
    }
  };
  // Get User By Email
  public userByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const searchData = req.body.search?.trim();
      if (!searchData) {
        throw new CustomError(200, "Search value is required");
      }
      const user: IUser[] | null = await User.find({
        email: { $regex: searchData, $options: "i" },
      });
      if (user.length === 0) {
        return res.status(200).json({ success: true, data: null });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (e) {
      return next(e);
    }
  };
}

export default UserController;

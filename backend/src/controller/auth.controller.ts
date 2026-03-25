import { Request, Response, NextFunction } from "express";
import IUser from "../interface/user.interface.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customerError.utils.js";
import JWTUtils from "../utils/jwt.utils.js";
import cookieOption from "../utils/cookieOption.utils.js";
import jwtUtils from "../utils/jwt.utils.js";
import { stat } from "fs";
class AuthController {

    // SIGNUP
    public userSignup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, password, email } = req.body;

            if (!name || !email || !password) {
                throw new CustomError(200, "All fields are required");
            }
            console.log(req.body)
            const existingUser: IUser | null = await User.findOne({ email });
            if (existingUser) {
                throw new CustomError(200, "User already exists");
            }
            const user = await User.create({ name, email, password });
            console.log(user)
            const token = JWTUtils.getToken({ id: user._id });
            res.cookie("token", token, cookieOption)
            return res.status(201).json({
                success: true,
                message: "User created successfully",
                userId: user._id, token,
            });

        } catch (e) {
            return next(e);
        }
    };

    // LOGIN
    public userLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            console.log(req.body)
            if (!email || !password) {
                throw new CustomError(200, "Email and Password required");
            }

            const user = await User.findOne({ email }).select("password");

            if (!user) {
                throw new CustomError(200, "User not found");
            }
            console.log(user)
            // const isMatch = await bcrypt.compare(password, user.password);
            const isMatch = user.password === password;
            if (!isMatch) {
                throw new CustomError(200, "Invalid credentials");
            }
            const token = jwtUtils.getToken(
                { id: user._id }
            );
            res.cookie("token", token, cookieOption)
            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
            });
        } catch (e) {
            return next(e);
        }
    };
    //   Logout
    public userLogout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie("token", cookieOption)
            return res.status(200).json({ success: true, message: "Logout Succesfully" })
        } catch (e) {
            return next(e);
        }
    }
}

export default AuthController;
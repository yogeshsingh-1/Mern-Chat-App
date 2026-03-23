import { Request, Response, NextFunction } from "express";
import IUser from "../interface/user.interface.js";
import User from "../models/user.model.js";
import CustomError from "../utils/customerError.utils.js";
import JWTUtils from "../utils/jwt.utils.js";
import cookieOption from "../utils/cookieOption.utils.js";
import jwtUtils from "../utils/jwt.utils.js";
class UserController {

    // SIGNUP
    public userSignup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, username, password } = req.body;

            if (!name || !username || !password) {
                throw new CustomError(400, "All fields are required");
            }

            const existingUser: IUser | null = await User.findOne({ username });
            if (existingUser) {
                throw new CustomError(409, "User already exists");
            }
            const user = await User.create({ name, username, password });
            const token = JWTUtils.getToken({ id: user._id });
            res.cookie("token", token, cookieOption)
            return res.status(201).json({
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
            const { username, password } = req.body;

            if (!username || !password) {
                throw new CustomError(400, "Username and password required");
            }

            const user = await User.findOne({ username });

            if (!user) {
                throw new CustomError(404, "User not found");
            }

            // const isMatch = await bcrypt.compare(password, user.password);

            // if (!isMatch) {
            //     throw new CustomError(401, "Invalid credentials");
            // }

            const token = jwtUtils.getToken(
                { id: user._id }
            );
            res.cookie("token", token, cookieOption)
            return res.status(200).json({
                message: "Login successful",
                token,
            });
        } catch (e) {
            return next(e);
        }
    };
}

export default UserController;
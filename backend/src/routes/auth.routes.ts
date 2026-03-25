import { Request, Response, NextFunction, Router } from "express"
import AuthController from "../controller/auth.controller.js";
import User from "../models/user.model.js";
const authRouter: Router = Router();
const authController = new AuthController();
// signup
authRouter.post("/auth/signup", authController.userSignup);
// signin
authRouter.post("/auth/login", authController.userLogin);
// logout
authRouter.get("/auth/logout", authController.userLogout);
export default authRouter;
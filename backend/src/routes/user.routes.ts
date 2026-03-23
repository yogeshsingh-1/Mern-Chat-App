import { Request, Response, NextFunction, Router } from "express"
import UserController from "../controller/user.controller.js";
import User from "../models/user.model.js";
const router: Router = Router();
const userController = new UserController();
router.post("/auth/login", userController.userLogin);
router.post("/auth/signup", userController.userSignup);
export default router;
import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controller/user.controller.js";

const userRouter: Router = Router();
const userController = new UserController();
// getUserByEmail
userRouter.post("/user/", userController.userByEmail);
// findAllUser
userRouter.get("/user/all", userController.findAllUsers);
// getUserById
userRouter.get("/user/:id", userController.userById);

export default userRouter;

import { Request, Response, NextFunction, Router } from "express"
import UserController from "../controller/user.controller.js";

const userRouter: Router = Router();
const userController = new UserController();
// findAllUser
userRouter.get("/user/all", userController.findAllUsers)
// getUserById
userRouter.get("/user/:id", userController.userById)
export default userRouter;
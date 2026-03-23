import { Response, NextFunction, Router } from "express";
import { UserRequest } from "../middlewares/auth.middleware.js";
const router: Router = Router();
router.get("/verify-token", (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({ status: true, userId: req.userId });
    } catch (e) {
        return next(e);
    }
});
export default router;

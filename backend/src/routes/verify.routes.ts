import { Request, Response, NextFunction, Router } from "express";

const router: Router = Router();
router.get("/verify-token", (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({ status: true, userId: req.userId });
    } catch (e) {
        return next(e);
    }
});
export default router;

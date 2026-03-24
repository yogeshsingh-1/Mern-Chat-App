import { Request, Response, NextFunction } from "express";

const errorHandleMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";
    console.log(message)
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandleMiddleware;
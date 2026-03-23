import { Request, Response, NextFunction } from "express";
import jwtUtils from "../utils/jwt.utils.js";
import CustomError from "../utils/customerError.utils.js";

// export interface UserRequest extends Request {
//     userId?: string;  // Optional banayein kyunki middleware ke pehle yeh exist nahi karta
//     user?: {
//         id: string;
//         email?: string;
//         role?: string;
//     }; // Advanced: Poora user data store kar sakte hain
// }
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            // user?: JwtPayload;
        }
    }
}


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Token ko cookies se ya header se le sakte hain
        let token = req.cookies?.token;

        // Agar cookie mein nahi milta to Authorization header check karein
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        console.log("Token received:", token ? "Present" : "Missing");

        if (!token) {
            throw new CustomError(401, "Unauthorized: No token provided");
        }

        // Verify token
        const jwtData = jwtUtils.verifyToken(token);

        // Type guard: Ensure jwtData has id property
        if (!jwtData || typeof jwtData === 'string') {
            throw new CustomError(401, "Unauthorized: Invalid token format");
        }

        // Attach user ID to request
        req.userId = jwtData.id;

        // Optional: Attach complete user data
        // req.user = {
        //     id: jwtData.id,
        //     email: (jwtData as any).email,
        //     role: (jwtData as any).role
        // };

        next();
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};

export default authMiddleware;
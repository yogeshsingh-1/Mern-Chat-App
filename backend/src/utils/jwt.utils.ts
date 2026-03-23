import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import envDetailsUtils from "./envDetails.utils.js"
import CustomError from "./customerError.utils.js";
interface jwtData extends JwtPayload {
    id: string
}
class JWTUtils {

    public getToken = (data: any): string => {
        const options: SignOptions = {
            expiresIn: "8h"
        };

        return jwt.sign(data, envDetailsUtils.JWT_SECRET, options);
    }

    public verifyToken = (token: string): jwtData => {
        try {
            return jwt.verify(token, envDetailsUtils.JWT_SECRET) as jwtData;
        } catch (error) {
            throw new CustomError(401, "Invalid or expired token");
        }
    }
}
export default new JWTUtils();
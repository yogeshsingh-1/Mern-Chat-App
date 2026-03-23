import { Document } from "mongoose";
interface IUser extends Document {
    id: string;
    name: string;
    username: string;
    password: string;
}
export default IUser;
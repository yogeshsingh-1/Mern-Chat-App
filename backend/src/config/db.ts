import mongoose from "mongoose";
import envDetailsUtils from "../utils/envDetails.utils.js";
const connectToDB = async (): Promise<void> => {
    try {
        await mongoose.connect(envDetailsUtils.MONGO_URI, { dbName: "chat" });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected");
        });
        mongoose.connection.on("error", (err) => {
            console.log("Mongoose error:", err);
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected");
        });
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

export default connectToDB;
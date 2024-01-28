import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `mongodb+srv://arnabar7:arnabar7@visionblog.n1in3y4.mongodb.net/${DB_NAME}`);
        console.log(`\n MONGODB connected successfully...`);
        console.log(`\n DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB Connection Failed!", error);
        process.exit(1);
    }
}


export { connectDB }
import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";


// Configurng .env
dotenv.config({
    path: "./env"
});


// Connect Database herre
connectDB()
.then(
    () => {
        app.on("Error", (error) => {
            console.log("Error : ", error);
            throw error
        });

        app.listen(3000 || 8000, () => {
            console.log(`\n Server is running at PORT : ${3000}`);
        });
    }
)
.catch(
    (error) => {
        console.log("MONGODB connection failed!", error);
    }
)


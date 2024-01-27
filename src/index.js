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

        app.listen(process.env.PORT || 8000, () => {
            console.log(`\n Server is running at PORT : ${process.env.PORT}`);
        });
    }
)
.catch(
    (error) => {
        console.log("MONGODB connection failed!", error);
    }
)


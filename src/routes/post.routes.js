import { Router } from "express";
import { addPost } from "../controllers/post.controllers.js";


const router = Router()

router.route("/create").post(addPost);


export default router
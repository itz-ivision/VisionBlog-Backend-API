import { Router } from "express";
import { addPost, getAllPosts } from "../controllers/post.controllers.js";


const router = Router()

router.route("/")
    .post(addPost)
    .get(getAllPosts)


export default router
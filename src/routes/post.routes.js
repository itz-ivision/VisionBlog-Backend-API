import { Router } from "express";
import { addPost, deletePost, getAllPosts } from "../controllers/post.controllers.js";


const router = Router()

router.route("/")
    .post(addPost)
    .get(getAllPosts)
    
router.route("/:postId").delete(deletePost);

export default router
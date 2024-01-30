import { Router } from "express";
import { addPost, deletePost, getAllPosts, getPostByID,updatePost } from "../controllers/post.controllers.js";


const router = Router()

router.route("/")
    .post(addPost)
    .get(getAllPosts);
    
router.route("/:postId")
    .get(getPostByID)
    .put(updatePost)
    .delete(deletePost);


export default router
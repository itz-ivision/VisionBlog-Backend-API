import { Router } from "express";
import { addPost, deletePost, getAllPosts, getPostByID,updatePost } from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/")
    .post(
        upload.fields([
            {
                name: 'image',
                maxCount: 1
            },
        ]),
        addPost)
    .get(getAllPosts);
    
router.route("/:postId")
    .get(getPostByID)
    .put(updatePost)
    .delete(deletePost);


export default router
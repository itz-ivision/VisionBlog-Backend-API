import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerrorHandler } from "../utils/APIerrorHandler.js";
import { APIresponseHandler } from "../utils/APIresponseHandler.js";

import { Post } from "../models/post.models.js";


const addPost = asyncHandler(
    async(req, res) => {
        try {
            
            const { title, content } = req.params

            if ([title, content].some((field) => field?.trim() === "")) {
                throw new APIerrorHandler(400, "Title and Content fields are required to post.")
            }

            const createdPost = await Post.create({
                title, 
                content
            });

            if (!createdPost) {
                throw new APIerrorHandler(500, "Something went wroong while creating post!!")
            }

            return res.status(200)
                .json(
                    new APIresponseHandler(
                        200, 
                        createdPost,
                        "Post has been created successfully."
                    )
                )

        } catch (error) {
            throw new APIerrorHandler(400, error.message)
        }
    }
)




export { addPost }
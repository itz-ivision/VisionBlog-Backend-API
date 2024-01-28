import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerrorHandler } from "../utils/APIerrorHandler.js";
import { APIresponseHandler } from "../utils/APIresponseHandler.js";

import { Post } from "../models/post.models.js";


// Get all post list
const getAllPosts = asyncHandler(
    async(req, res) => {
        try {
            const allPosts = await Post.find();
    
            return res.status(200)
                .json(
                    new APIresponseHandler(
                        200,
                        allPosts,
                        "All Posts fetched successfully.."
                    )
                )
        } catch (error) {
            throw new APIerrorHandler(400, error.message);
        }

    }
)

// Create a single post
const addPost = asyncHandler(
    async(req, res) => {
        try {
            
            const { title, content } = req.body

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

// Get a post by ID
const getPostByID = asyncHandler(
    async(req, res) => {
        try {
            const { postId } = req.params
    
            if (!postId) {
                throw new APIerrorHandler(400, "Invalid Request")
            }
    
            const post = await Post.findById(postId);
    
            if (!post) {
                throw new APIerrorHandler(404, "No Post Found!")
            }
    
            return res.status(200)
                .json(
                    new APIresponseHandler(
                        200,
                        post,
                        "Post Fetched Successfully."
                    )
                )
        } catch (error) {
            throw new APIerrorHandler(400, error.message)
        }

    }
);

// Update post by ID
const updatePost = asyncHandler(
    async(req, res) => {
        try {
            const { postId } = req.params
            const { title, content } = req.body
    
            if (!postId) {
                throw new APIerrorHandler(400, "Invalid Request")
            }
    
            if ([title, content].some((field) => field === "")) {
                throw new APIerrorHandler(400, "Title and Content fields are required to post.");
            }
    
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $set: {
                        title,
                        content
                    }
                },
                {new: true}
            )
    
            return res.status(200)
                .json(
                    new APIresponseHandler(
                        200,
                        updatedPost,
                        "Post has been updated successfully."
                    )
                )
        } catch (error) {
            throw new APIerrorHandler(400, error.message)
        }
    }
);

// Delete Post by ID
const deletePost = asyncHandler(
    async(req, res) => {
        try {
            const { postId } = req.params
    
            if (!postId) {
                throw new APIerrorHandler(400, "Invalid Request")
            }
    
            await Post.findByIdAndDelete(postId)
    
            return res.status(200)
                .json(
                    new APIresponseHandler(
                        200,
                        {},
                        "Your post has been deletedd successfully."
                    )
                )
        } catch (error) {
            throw new APIerrorHandler(400, error.message);
        }
    }
);

export { 
    getAllPosts,
    addPost,
    getPostByID,
    updatePost,
    deletePost
}
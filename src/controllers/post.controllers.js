import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerrorHandler } from "../utils/APIerrorHandler.js";
import { APIresponseHandler } from "../utils/APIresponseHandler.js";

import { Post } from "../models/post.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Get all post list
const getAllPosts = asyncHandler(
    async(req, res) => {
        try {
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.page;
            const postQuery = Post.find();
            let fetchedPosts;

            if (pageSize && currentPage) {
                postQuery
                    .skip(pageSize * (currentPage - 1))
                    .limit(pageSize);
            }

            await postQuery.then(
                (documents) => {
                    fetchedPosts = documents;
                    return Post.countDocuments();
                }).then(
                    count => {
                        return res.status(200)
                                        .json(
                                            {
                                                posts: fetchedPosts,
                                                postCounts: count,
                                                message: "All Posts fetched successfully.."
                                            }
                                        )
                    }
                );
            
        } catch (error) {
            throw new APIerrorHandler(400, error.message);
        }

    }
);

// Create a single post
const addPost = asyncHandler(
    async(req, res) => {
        try {
            
            const { title, content } = req.body

            if ([title, content].some((field) => field?.trim() === "")) {
                throw new APIerrorHandler(400, "Title and Content fields are required to post.")
            }

            const imageLocalPath = req.files?.image[0]?.path;
            if (!imageLocalPath) {
                throw new APIerrorHandler(400, "Image not found")
            }
 
            const postImage = await uploadOnCloudinary(imageLocalPath);
            if (!postImage) {
                throw new APIerrorHandler(400, "Image is required to post")
            }
            
            const createdPost = await Post.create({
                title, 
                content,
                imagePath: postImage?.url || ""
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
);

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
            console.log(req.file);
            const { postId } = req.params
            const { title, content } = req.body
    
            if (!postId) {
                throw new APIerrorHandler(400, "Invalid Request")
            }
    
            if ([title, content].some((field) => field === "")) {
                throw new APIerrorHandler(400, "Title and Content fields are required to post.");
            }
    
            const imageLocalPath = req.file?.image[0]?.path;
            if (!imageLocalPath) {
                throw new APIerrorHandler(400, "Image not found")
            }
 
            const postImage = await uploadOnCloudinary(imageLocalPath);
            if (!postImage) {
                throw new APIerrorHandler(400, "Image is required to post")
            }

            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {
                    $set: {
                        title, 
                        content,
                        imagePath: postImage?.url || ""
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
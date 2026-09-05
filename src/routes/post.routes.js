import express from "express";

import {
    create,
    getMy,
    getOne,
    update,
    remove,
    togglePublished,
    toggleFeatured,
    incrementViews
} from "../controllers/post/post.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
    createPostSchema,
    updatePostSchema
} from "../validators/post.validator.js";


const router = express.Router();


// ========================================
// CREATE POST
// ========================================

router.post(
    "/",
    authMiddleware,
    validate(createPostSchema),
    create
);


// ========================================
// GET MY POSTS
// ========================================

router.get(
    "/",
    authMiddleware,
    getMy
);


// ========================================
// GET SINGLE POST
// ========================================

router.get(
    "/:postId",
    authMiddleware,
    getOne
);


// ========================================
// UPDATE POST
// ========================================

router.patch(
    "/:postId",
    authMiddleware,
    validate(updatePostSchema),
    update
);


// ========================================
// DELETE POST
// ========================================

router.delete(
    "/:postId",
    authMiddleware,
    remove
);


// ========================================
// PUBLISH / UNPUBLISH
// ========================================

router.patch(
    "/:postId/published",
    authMiddleware,
    togglePublished
);


// ========================================
// FEATURE / UNFEATURE
// ========================================

router.patch(
    "/:postId/featured",
    authMiddleware,
    toggleFeatured
);


// ========================================
// INCREMENT VIEWS
// ========================================

router.patch(
    "/:postId/views",
    incrementViews
);


export default router;
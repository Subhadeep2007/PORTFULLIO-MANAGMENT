import express from "express";


import {
    create,
    getMy,
    getOne,
    update,
    remove,
    toggleFeatured,
    togglePublished
} from "../controllers/project/project.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";


import validate from "../middleware/validate.middleware.js";


import {
    createProjectSchema,
    updateProjectSchema
} from "../validators/project.validator.js";


const router = express.Router();


// ========================================
// CREATE PROJECT
// ========================================

router.post(
    "/",
    authMiddleware,
    validate(createProjectSchema),
    create
);


// ========================================
// GET MY PROJECTS
// ========================================

router.get(
    "/",
    authMiddleware,
    getMy
);


// ========================================
// GET SINGLE PROJECT
// ========================================

router.get(
    "/:projectId",
    authMiddleware,
    getOne
);


// ========================================
// UPDATE PROJECT
// ========================================

router.patch(
    "/:projectId",
    authMiddleware,
    validate(updateProjectSchema),
    update
);


// ========================================
// DELETE PROJECT
// ========================================

router.delete(
    "/:projectId",
    authMiddleware,
    remove
);


// ========================================
// TOGGLE FEATURED
// ========================================

router.patch(
    "/:projectId/featured",
    authMiddleware,
    toggleFeatured
);


// ========================================
// TOGGLE PUBLISHED
// ========================================

router.patch(
    "/:projectId/published",
    authMiddleware,
    togglePublished
);


export default router;
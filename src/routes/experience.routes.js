import express from "express";


import {
    create,
    getMy,
    getOne,
    update,
    remove,
    togglePublished
} from "../controllers/experience/experience.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";


import validate from "../middleware/validate.middleware.js";


import {
    createExperienceSchema,
    updateExperienceSchema
} from "../validators/experience.validator.js";


const router = express.Router();


// ========================================
// CREATE EXPERIENCE
// ========================================

router.post(
    "/",
    authMiddleware,
    validate(createExperienceSchema),
    create
);


// ========================================
// GET MY EXPERIENCES
// ========================================

router.get(
    "/",
    authMiddleware,
    getMy
);


// ========================================
// GET SINGLE EXPERIENCE
// ========================================

router.get(
    "/:experienceId",
    authMiddleware,
    getOne
);


// ========================================
// UPDATE EXPERIENCE
// ========================================

router.patch(
    "/:experienceId",
    authMiddleware,
    validate(updateExperienceSchema),
    update
);


// ========================================
// DELETE EXPERIENCE
// ========================================

router.delete(
    "/:experienceId",
    authMiddleware,
    remove
);


// ========================================
// PUBLISH / UNPUBLISH
// ========================================

router.patch(
    "/:experienceId/published",
    authMiddleware,
    togglePublished
);


export default router;
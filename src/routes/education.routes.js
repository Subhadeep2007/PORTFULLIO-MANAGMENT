import express from "express";


import {
    create,
    getMy,
    getOne,
    update,
    remove,
    togglePublished
} from "../controllers/education/education.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";


import validate from "../middleware/validate.middleware.js";


import {
    createEducationSchema,
    updateEducationSchema
} from "../validators/education.validator.js";


const router = express.Router();


// ========================================
// CREATE EDUCATION
// ========================================

router.post(
    "/",
    authMiddleware,
    validate(createEducationSchema),
    create
);


// ========================================
// GET MY EDUCATION
// ========================================

router.get(
    "/",
    authMiddleware,
    getMy
);


// ========================================
// GET SINGLE EDUCATION
// ========================================

router.get(
    "/:educationId",
    authMiddleware,
    getOne
);


// ========================================
// UPDATE EDUCATION
// ========================================

router.patch(
    "/:educationId",
    authMiddleware,
    validate(updateEducationSchema),
    update
);


// ========================================
// DELETE EDUCATION
// ========================================

router.delete(
    "/:educationId",
    authMiddleware,
    remove
);


// ========================================
// PUBLISH / UNPUBLISH
// ========================================

router.patch(
    "/:educationId/published",
    authMiddleware,
    togglePublished
);


export default router;
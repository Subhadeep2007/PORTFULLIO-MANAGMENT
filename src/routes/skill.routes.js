import express from "express";

import {
    create,
    getMy,
    getOne,
    update,
    remove,
    togglePublished
} from "../controllers/skill/skill.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
    createSkillSchema,
    updateSkillSchema
} from "../validators/skill.validator.js";


const router = express.Router();


// ========================================
// CREATE
// ========================================

router.post(
    "/",
    authMiddleware,
    validate(createSkillSchema),
    create
);


// ========================================
// GET MY SKILLS
// ========================================

router.get(
    "/",
    authMiddleware,
    getMy
);


// ========================================
// GET SINGLE SKILL
// ========================================

router.get(
    "/:skillId",
    authMiddleware,
    getOne
);


// ========================================
// UPDATE
// ========================================

router.patch(
    "/:skillId",
    authMiddleware,
    validate(updateSkillSchema),
    update
);


// ========================================
// DELETE
// ========================================

router.delete(
    "/:skillId",
    authMiddleware,
    remove
);


// ========================================
// PUBLISH / UNPUBLISH
// ========================================

router.patch(
    "/:skillId/published",
    authMiddleware,
    togglePublished
);


export default router;
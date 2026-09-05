import { body } from "express-validator";


// ========================================
// CREATE SKILL
// ========================================

const createSkillSchema = [

    body("name")
    .optional()
    .trim()
    .isLength({
        max: 100
    })
    .withMessage(
        "Skill name cannot exceed 100 characters"
    ),


    body("category")
    .optional()
    .trim()
    .isLength({
        max: 100
    })
    .withMessage(
        "Category cannot exceed 100 characters"
    ),


    body("level")
    .optional()
    .isIn([
        "beginner",
        "intermediate",
        "advanced",
        "expert"
    ])
    .withMessage(
        "Invalid skill level"
    ),


    body("percentage")
    .optional()
    .isInt({
        min: 0,
        max: 100
    })
    .withMessage(
        "Percentage must be between 0 and 100"
    ),


    body("icon")
    .optional()
    .trim()
    .isLength({
        max: 500
    })
    .withMessage(
        "Icon cannot exceed 500 characters"
    ),


    body("description")
    .optional()
    .trim()
    .isLength({
        max: 500
    })
    .withMessage(
        "Description cannot exceed 500 characters"
    ),


    body("order")
    .optional()
    .isInt({
        min: 0
    })
    .withMessage(
        "Order must be a positive number"
    ),


    body("isPublished")
    .optional()
    .isBoolean()
    .withMessage(
        "isPublished must be true or false"
    )

];


// ========================================
// UPDATE SKILL
// ========================================

const updateSkillSchema = [

    body("name")
    .optional()
    .trim()
    .isLength({
        max: 100
    })
    .withMessage(
        "Skill name cannot exceed 100 characters"
    ),


    body("category")
    .optional()
    .trim()
    .isLength({
        max: 100
    })
    .withMessage(
        "Category cannot exceed 100 characters"
    ),


    body("level")
    .optional()
    .isIn([
        "beginner",
        "intermediate",
        "advanced",
        "expert"
    ])
    .withMessage(
        "Invalid skill level"
    ),


    body("percentage")
    .optional()
    .isInt({
        min: 0,
        max: 100
    })
    .withMessage(
        "Percentage must be between 0 and 100"
    ),


    body("icon")
    .optional()
    .trim()
    .isLength({
        max: 500
    })
    .withMessage(
        "Icon cannot exceed 500 characters"
    ),


    body("description")
    .optional()
    .trim()
    .isLength({
        max: 500
    })
    .withMessage(
        "Description cannot exceed 500 characters"
    ),


    body("order")
    .optional()
    .isInt({
        min: 0
    })
    .withMessage(
        "Order must be a positive number"
    ),


    body("isPublished")
    .optional()
    .isBoolean()
    .withMessage(
        "isPublished must be true or false"
    )

];


export {
    createSkillSchema,
    updateSkillSchema
};
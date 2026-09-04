import { body } from "express-validator";


// ========================================
// CREATE PORTFOLIO
// ========================================

const createPortfolioSchema = [

    body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({
        min: 3,
        max: 30
    })
    .withMessage(
        "Username must be between 3 and 30 characters"
    )
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
        "Username can only contain letters, numbers and underscores"
    ),

    body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .isLength({
        min: 3,
        max: 50
    })
    .withMessage(
        "Slug must be between 3 and 50 characters"
    )
    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage(
        "Slug can only contain letters, numbers and hyphens"
    )
];


// ========================================
// UPDATE PORTFOLIO
// ========================================

const updatePortfolioSchema = [

    body("username")
    .optional()
    .trim()
    .isLength({
        min: 3,
        max: 30
    })
    .withMessage(
        "Username must be between 3 and 30 characters"
    )
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
        "Username can only contain letters, numbers and underscores"
    ),

    body("slug")
    .optional()
    .trim()
    .isLength({
        min: 3,
        max: 50
    })
    .withMessage(
        "Slug must be between 3 and 50 characters"
    )
    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage(
        "Slug can only contain letters, numbers and hyphens"
    )
];


// ========================================
// EXPORT
// ========================================

export {
    createPortfolioSchema,
    updatePortfolioSchema
};
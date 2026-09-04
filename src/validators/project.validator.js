import { body } from "express-validator";


// ========================================
// CREATE PROJECT
// ========================================

const createProjectSchema = [

    body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({
        max: 100
    })
    .withMessage(
        "Project title cannot exceed 100 characters"
    ),


    body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required")
    .isLength({
        max: 2000
    })
    .withMessage(
        "Project description cannot exceed 2000 characters"
    ),


    body("image")
    .optional()
    .trim(),


    body("technologies")
    .optional()
    .isArray()
    .withMessage(
        "Technologies must be an array"
    ),


    body("githubUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "GitHub URL must be a valid URL"
    ),


    body("liveUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Live demo URL must be a valid URL"
    ),


    body("category")
    .optional()
    .trim()
    .isLength({
        max: 50
    })
    .withMessage(
        "Category cannot exceed 50 characters"
    ),


    body("featured")
    .optional()
    .isBoolean()
    .withMessage(
        "Featured must be true or false"
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
// UPDATE PROJECT
// ========================================

const updateProjectSchema = [

    body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
        "Project title cannot be empty"
    )
    .isLength({
        max: 100
    })
    .withMessage(
        "Project title cannot exceed 100 characters"
    ),


    body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
        "Project description cannot be empty"
    )
    .isLength({
        max: 2000
    })
    .withMessage(
        "Project description cannot exceed 2000 characters"
    ),


    body("image")
    .optional()
    .trim(),


    body("technologies")
    .optional()
    .isArray()
    .withMessage(
        "Technologies must be an array"
    ),


    body("githubUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "GitHub URL must be a valid URL"
    ),


    body("liveUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Live demo URL must be a valid URL"
    ),


    body("category")
    .optional()
    .trim()
    .isLength({
        max: 50
    })
    .withMessage(
        "Category cannot exceed 50 characters"
    ),


    body("featured")
    .optional()
    .isBoolean()
    .withMessage(
        "Featured must be true or false"
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
    createProjectSchema,
    updateProjectSchema
};
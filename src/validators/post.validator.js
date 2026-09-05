import { body } from "express-validator";


// ========================================
// CREATE POST
// ========================================

const createPostSchema = [

    body("title")
    .optional()
    .trim()
    .isLength({
        max: 200
    })
    .withMessage(
        "Title cannot exceed 200 characters"
    ),


    body("slug")
    .optional()
    .trim()
    .isSlug()
    .withMessage(
        "Slug must contain only letters, numbers and hyphens"
    ),


    body("excerpt")
    .optional()
    .trim()
    .isLength({
        max: 500
    })
    .withMessage(
        "Excerpt cannot exceed 500 characters"
    ),


    body("content")
    .optional()
    .isString()
    .withMessage(
        "Content must be a string"
    ),


    body("coverImage")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Cover image must be a valid URL"
    ),


    body("postType")
    .optional()
    .isIn([
        "blog",
        "project",
        "achievement",
        "announcement"
    ])
    .withMessage(
        "Invalid post type"
    ),


    body("tags")
    .optional()
    .isArray()
    .withMessage(
        "Tags must be an array"
    ),


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


    body("demoUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Demo URL must be a valid URL"
    ),


    body("externalUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "External URL must be a valid URL"
    ),


    body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage(
        "isFeatured must be true or false"
    ),


    body("isPublished")
    .optional()
    .isBoolean()
    .withMessage(
        "isPublished must be true or false"
    ),


    body("order")
    .optional()
    .isInt({
        min: 0
    })
    .withMessage(
        "Order must be a positive number"
    )

];


// ========================================
// UPDATE POST
// ========================================

const updatePostSchema = [

    body("title")
    .optional()
    .trim()
    .isLength({
        max: 200
    })
    .withMessage(
        "Title cannot exceed 200 characters"
    ),


    body("slug")
    .optional()
    .trim()
    .isSlug()
    .withMessage(
        "Slug must contain only letters, numbers and hyphens"
    ),


    body("excerpt")
    .optional()
    .trim()
    .isLength({
        max: 500
    })
    .withMessage(
        "Excerpt cannot exceed 500 characters"
    ),


    body("content")
    .optional()
    .isString()
    .withMessage(
        "Content must be a string"
    ),


    body("coverImage")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Cover image must be a valid URL"
    ),


    body("postType")
    .optional()
    .isIn([
        "blog",
        "project",
        "achievement",
        "announcement"
    ])
    .withMessage(
        "Invalid post type"
    ),


    body("tags")
    .optional()
    .isArray()
    .withMessage(
        "Tags must be an array"
    ),


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


    body("demoUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Demo URL must be a valid URL"
    ),


    body("externalUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "External URL must be a valid URL"
    ),


    body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage(
        "isFeatured must be true or false"
    ),


    body("isPublished")
    .optional()
    .isBoolean()
    .withMessage(
        "isPublished must be true or false"
    ),


    body("order")
    .optional()
    .isInt({
        min: 0
    })
    .withMessage(
        "Order must be a positive number"
    )

];


export {
    createPostSchema,
    updatePostSchema
};
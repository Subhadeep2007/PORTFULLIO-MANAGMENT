import { body } from "express-validator";


// ========================================
// CREATE EXPERIENCE
// ========================================

const createExperienceSchema = [

    body("jobTitle")
    .trim()
    .notEmpty()
    .withMessage(
        "Job title is required"
    )
    .isLength({
        max: 100
    })
    .withMessage(
        "Job title cannot exceed 100 characters"
    ),


    body("company")
    .trim()
    .notEmpty()
    .withMessage(
        "Company is required"
    )
    .isLength({
        max: 150
    })
    .withMessage(
        "Company cannot exceed 150 characters"
    ),


    body("companyUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Company URL must be a valid URL"
    ),


    body("location")
    .optional()
    .trim()
    .isLength({
        max: 100
    })
    .withMessage(
        "Location cannot exceed 100 characters"
    ),


    body("employmentType")
    .optional()
    .isIn([
        "full-time",
        "part-time",
        "internship",
        "freelance",
        "contract"
    ])
    .withMessage(
        "Invalid employment type"
    ),


    body("startDate")
    .notEmpty()
    .withMessage(
        "Start date is required"
    )
    .isISO8601()
    .withMessage(
        "Start date must be a valid date"
    ),


    body("endDate")
    .optional({
        values: "falsy"
    })
    .isISO8601()
    .withMessage(
        "End date must be a valid date"
    ),


    body("currentlyWorking")
    .optional()
    .isBoolean()
    .withMessage(
        "currentlyWorking must be true or false"
    ),


    body("description")
    .optional()
    .trim()
    .isLength({
        max: 3000
    })
    .withMessage(
        "Description cannot exceed 3000 characters"
    ),


    body("technologies")
    .optional()
    .isArray()
    .withMessage(
        "Technologies must be an array"
    ),


    body("achievements")
    .optional()
    .isArray()
    .withMessage(
        "Achievements must be an array"
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
// UPDATE EXPERIENCE
// ========================================

const updateExperienceSchema = [

    body("jobTitle")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
        "Job title cannot be empty"
    )
    .isLength({
        max: 100
    })
    .withMessage(
        "Job title cannot exceed 100 characters"
    ),


    body("company")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
        "Company cannot be empty"
    )
    .isLength({
        max: 150
    })
    .withMessage(
        "Company cannot exceed 150 characters"
    ),


    body("companyUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Company URL must be a valid URL"
    ),


    body("location")
    .optional()
    .trim()
    .isLength({
        max: 100
    })
    .withMessage(
        "Location cannot exceed 100 characters"
    ),


    body("employmentType")
    .optional()
    .isIn([
        "full-time",
        "part-time",
        "internship",
        "freelance",
        "contract"
    ])
    .withMessage(
        "Invalid employment type"
    ),


    body("startDate")
    .optional()
    .isISO8601()
    .withMessage(
        "Start date must be a valid date"
    ),


    body("endDate")
    .optional({
        values: "falsy"
    })
    .isISO8601()
    .withMessage(
        "End date must be a valid date"
    ),


    body("currentlyWorking")
    .optional()
    .isBoolean()
    .withMessage(
        "currentlyWorking must be true or false"
    ),


    body("description")
    .optional()
    .trim()
    .isLength({
        max: 3000
    })
    .withMessage(
        "Description cannot exceed 3000 characters"
    ),


    body("technologies")
    .optional()
    .isArray()
    .withMessage(
        "Technologies must be an array"
    ),


    body("achievements")
    .optional()
    .isArray()
    .withMessage(
        "Achievements must be an array"
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
    createExperienceSchema,
    updateExperienceSchema
};
import { body } from "express-validator";


// ========================================
// CREATE EDUCATION
// ========================================

const createEducationSchema = [

    body("institution")
    .trim()
    .notEmpty()
    .withMessage(
        "Institution is required"
    )
    .isLength({
        max: 200
    })
    .withMessage(
        "Institution cannot exceed 200 characters"
    ),


    body("degree")
    .trim()
    .notEmpty()
    .withMessage(
        "Degree is required"
    )
    .isLength({
        max: 150
    })
    .withMessage(
        "Degree cannot exceed 150 characters"
    ),


    body("fieldOfStudy")
    .optional()
    .trim()
    .isLength({
        max: 150
    })
    .withMessage(
        "Field of study cannot exceed 150 characters"
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


    body("currentlyStudying")
    .optional()
    .isBoolean()
    .withMessage(
        "currentlyStudying must be true or false"
    ),


    body("grade")
    .optional()
    .trim()
    .isLength({
        max: 50
    })
    .withMessage(
        "Grade cannot exceed 50 characters"
    ),


    body("description")
    .optional()
    .trim()
    .isLength({
        max: 2000
    })
    .withMessage(
        "Description cannot exceed 2000 characters"
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
// UPDATE EDUCATION
// ========================================

const updateEducationSchema = [

    body("institution")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
        "Institution cannot be empty"
    )
    .isLength({
        max: 200
    })
    .withMessage(
        "Institution cannot exceed 200 characters"
    ),


    body("degree")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
        "Degree cannot be empty"
    )
    .isLength({
        max: 150
    })
    .withMessage(
        "Degree cannot exceed 150 characters"
    ),


    body("fieldOfStudy")
    .optional()
    .trim()
    .isLength({
        max: 150
    })
    .withMessage(
        "Field of study cannot exceed 150 characters"
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


    body("currentlyStudying")
    .optional()
    .isBoolean()
    .withMessage(
        "currentlyStudying must be true or false"
    ),


    body("grade")
    .optional()
    .trim()
    .isLength({
        max: 50
    })
    .withMessage(
        "Grade cannot exceed 50 characters"
    ),


    body("description")
    .optional()
    .trim()
    .isLength({
        max: 2000
    })
    .withMessage(
        "Description cannot exceed 2000 characters"
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
    createEducationSchema,
    updateEducationSchema
};
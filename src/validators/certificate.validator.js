import { body } from "express-validator";


// ========================================
// CREATE CERTIFICATE
// ========================================

const createCertificateSchema = [

    body("title")
    .optional()
    .trim()
    .isLength({
        max: 200
    })
    .withMessage(
        "Title cannot exceed 200 characters"
    ),


    body("issuingOrganization")
    .optional()
    .trim()
    .isLength({
        max: 200
    })
    .withMessage(
        "Issuing organization cannot exceed 200 characters"
    ),


    body("issueDate")
    .optional({
        values: "falsy"
    })
    .isISO8601()
    .withMessage(
        "Issue date must be a valid date"
    ),


    body("expiryDate")
    .optional({
        values: "falsy"
    })
    .isISO8601()
    .withMessage(
        "Expiry date must be a valid date"
    ),


    body("credentialId")
    .optional()
    .trim()
    .isLength({
        max: 150
    })
    .withMessage(
        "Credential ID cannot exceed 150 characters"
    ),


    body("credentialUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Credential URL must be a valid URL"
    ),


    body("certificateImage")
    .optional()
    .trim()
    .isLength({
        max: 1000
    })
    .withMessage(
        "Certificate image URL is too long"
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


    body("skills")
    .optional()
    .isArray()
    .withMessage(
        "Skills must be an array"
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
// UPDATE CERTIFICATE
// ========================================

const updateCertificateSchema = [

    body("title")
    .optional()
    .trim()
    .isLength({
        max: 200
    })
    .withMessage(
        "Title cannot exceed 200 characters"
    ),


    body("issuingOrganization")
    .optional()
    .trim()
    .isLength({
        max: 200
    })
    .withMessage(
        "Issuing organization cannot exceed 200 characters"
    ),


    body("issueDate")
    .optional({
        values: "falsy"
    })
    .isISO8601()
    .withMessage(
        "Issue date must be a valid date"
    ),


    body("expiryDate")
    .optional({
        values: "falsy"
    })
    .isISO8601()
    .withMessage(
        "Expiry date must be a valid date"
    ),


    body("credentialId")
    .optional()
    .trim()
    .isLength({
        max: 150
    })
    .withMessage(
        "Credential ID cannot exceed 150 characters"
    ),


    body("credentialUrl")
    .optional({
        values: "falsy"
    })
    .trim()
    .isURL()
    .withMessage(
        "Credential URL must be a valid URL"
    ),


    body("certificateImage")
    .optional()
    .trim()
    .isLength({
        max: 1000
    })
    .withMessage(
        "Certificate image URL is too long"
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


    body("skills")
    .optional()
    .isArray()
    .withMessage(
        "Skills must be an array"
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
    createCertificateSchema,
    updateCertificateSchema
};
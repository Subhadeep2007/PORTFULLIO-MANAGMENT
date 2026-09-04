import { body } from "express-validator";


// ========================================
// REGISTER
// ========================================

const registerSchema = [

    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({
        min: 2,
        max: 50
    })
    .withMessage("Name must be between 2 and 50 characters"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
        min: 8
    })
    .withMessage("Password must be at least 8 characters"),

    body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Invalid role"),

    body("adminSecret")
    .optional()
    .isString()
    .withMessage("Admin secret must be a string")
];


// ========================================
// VERIFY EMAIL
// ========================================

const verifyEmailSchema = [

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

    body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({
        min: 6,
        max: 6
    })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers")
];


// ========================================
// RESEND VERIFICATION
// ========================================

const resendVerificationSchema = [

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail()
];


// ========================================
// LOGIN
// ========================================

const loginSchema = [

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("Password is required"),

    body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Invalid role"),

    body("adminSecret")
    .optional()
    .isString()
    .withMessage("Admin secret must be a string")
];


// ========================================
// FORGOT PASSWORD
// ========================================

const forgotPasswordSchema = [

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail()
];


// ========================================
// RESET PASSWORD
// ========================================

const resetPasswordSchema = [

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

    body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({
        min: 6,
        max: 6
    })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers"),

    body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({
        min: 8
    })
    .withMessage("Password must be at least 8 characters")
];


// ========================================
// CHANGE PASSWORD
// ========================================

const changePasswordSchema = [

    body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

    body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({
        min: 8
    })
    .withMessage("New password must be at least 8 characters")
];


// ========================================
// EXPORT
// ========================================

export {
    registerSchema,
    verifyEmailSchema,
    resendVerificationSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema
};
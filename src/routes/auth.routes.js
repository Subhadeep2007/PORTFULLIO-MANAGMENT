import express from "express";

import {
    register,
    verifyEmail,
    resendVerificationOTP,
    login,
    refreshToken,
    logout,
    forgotPasswordController,
    resetPasswordController,
    changePasswordController
} from "../controllers/auth/auth.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
    registerSchema,
    verifyEmailSchema,
    resendVerificationSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema
} from "../validators/auth.validator.js";

import authMiddleware from "../middleware/auth.middleware.js";

import authRateLimiter from "../middleware/rateLimit.middleware.js";

const router = express.Router();


// ===============================
// REGISTER
// ===============================

router.post(
    "/register",
    validate(registerSchema),
    register
);


// ===============================
// VERIFY EMAIL
// ===============================

router.post(
    "/verify-email",
    authRateLimiter,
    validate(verifyEmailSchema),
    verifyEmail
);


// ===============================
// RESEND VERIFICATION
// ===============================

router.post(
    "/resend-verification",
    authRateLimiter,
    validate(resendVerificationSchema),
    resendVerificationOTP
);


// ===============================
// LOGIN
// ===============================

router.post(
    "/login",
    authRateLimiter,
    validate(loginSchema),
    login
);


// ===============================
// REFRESH TOKEN
// ===============================

router.post(
    "/refresh-token",
    refreshToken
);


// ===============================
// LOGOUT
// ===============================

router.post(
    "/logout",
    logout
);


// ===============================
// FORGOT PASSWORD
// ===============================

router.post(
    "/forgot-password",
    authRateLimiter,
    validate(forgotPasswordSchema),
    forgotPasswordController
);


// ===============================
// RESET PASSWORD
// ===============================

router.post(
    "/reset-password",
    authRateLimiter,
    validate(resetPasswordSchema),
    resetPasswordController
);


// ===============================
// CHANGE PASSWORD
// ===============================

router.post(
    "/change-password",
    authMiddleware,
    validate(changePasswordSchema),
    changePasswordController
);


export default router;
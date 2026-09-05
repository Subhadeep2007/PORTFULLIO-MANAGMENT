import express from "express";

import {

    dashboard,

    users,

    userDetails,

    activate,

    deactivate,

    removeUser,

    portfolios,

    portfolioDetails,

    statistics

} from "../controllers/admin/admin.controller.js";

import authMiddleware
from "../middleware/auth.middleware.js";

import adminMiddleware
from "../middleware/admin.middleware.js";


const router =
    express.Router();


// ========================================
// ADMIN PROTECTION
// ========================================

router.use(
    authMiddleware
);

router.use(
    adminMiddleware
);


// ========================================
// DASHBOARD
// ========================================

router.get(
    "/dashboard",
    dashboard
);


// ========================================
// USERS
// ========================================

router.get(
    "/users",
    users
);


// ========================================
// USER DETAILS
// ========================================

router.get(
    "/users/:userId",
    userDetails
);


// ========================================
// ACTIVATE USER
// ========================================

router.patch(
    "/users/:userId/activate",
    activate
);


// ========================================
// DEACTIVATE USER
// ========================================

router.patch(
    "/users/:userId/deactivate",
    deactivate
);


// ========================================
// DELETE USER
// ========================================

router.delete(
    "/users/:userId",
    removeUser
);


// ========================================
// PORTFOLIOS
// ========================================

router.get(
    "/portfolios",
    portfolios
);


// ========================================
// PORTFOLIO DETAILS
// ========================================

router.get(
    "/portfolios/:portfolioId",
    portfolioDetails
);


// ========================================
// PLATFORM STATISTICS
// ========================================

router.get(
    "/statistics",
    statistics
);


export default router;
import express from "express";

import {
    getPortfolio,
    getPost
} from "../controllers/public/publicPortfolio.controller.js";


const router = express.Router();


// ========================================
// PUBLIC PORTFOLIO
// ========================================

router.get(
    "/portfolio/:username",
    getPortfolio
);


// ========================================
// PUBLIC POST
// ========================================

router.get(
    "/portfolio/:username/post/:slug",
    getPost
);


export default router;
import express from "express";

import {

    create,
    getMy,
    getOne,
    update,
    remove,
    togglePublished

} from "../controllers/certificate/certificate.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {

    createCertificateSchema,
    updateCertificateSchema

} from "../validators/certificate.validator.js";


const router = express.Router();


// ========================================
// CREATE
// ========================================

router.post(
    "/",
    authMiddleware,
    validate(createCertificateSchema),
    create
);


// ========================================
// GET MY CERTIFICATES
// ========================================

router.get(
    "/",
    authMiddleware,
    getMy
);


// ========================================
// GET SINGLE
// ========================================

router.get(
    "/:certificateId",
    authMiddleware,
    getOne
);


// ========================================
// UPDATE
// ========================================

router.patch(
    "/:certificateId",
    authMiddleware,
    validate(updateCertificateSchema),
    update
);


// ========================================
// DELETE
// ========================================

router.delete(
    "/:certificateId",
    authMiddleware,
    remove
);


// ========================================
// PUBLISH / UNPUBLISH
// ========================================

router.patch(
    "/:certificateId/published",
    authMiddleware,
    togglePublished
);


export default router;
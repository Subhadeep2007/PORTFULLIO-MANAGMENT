import {
    createCertificate,
    getMyCertificates,
    getCertificateById,
    updateCertificate,
    deleteCertificate,
    toggleCertificatePublished
} from "../../services/certificate/certificate.service.js";


// ========================================
// CREATE CERTIFICATE
// ========================================

const create = async(req, res, next) => {

    try {

        const certificate =
            await createCertificate(
                req.user.userId,
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Certificate created successfully",

            data: certificate

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY CERTIFICATES
// ========================================

const getMy = async(req, res, next) => {

    try {

        const certificates =
            await getMyCertificates(
                req.user.userId
            );

        return res.status(200).json({

            success: true,

            message: "Certificates fetched successfully",

            data: certificates

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET SINGLE CERTIFICATE
// ========================================

const getOne = async(req, res, next) => {

    try {

        const certificate =
            await getCertificateById(
                req.user.userId,
                req.params.certificateId
            );

        return res.status(200).json({

            success: true,

            message: "Certificate fetched successfully",

            data: certificate

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE CERTIFICATE
// ========================================

const update = async(req, res, next) => {

    try {

        const certificate =
            await updateCertificate(

                req.user.userId,

                req.params.certificateId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Certificate updated successfully",

            data: certificate

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE CERTIFICATE
// ========================================

const remove = async(req, res, next) => {

    try {

        const result =
            await deleteCertificate(

                req.user.userId,

                req.params.certificateId

            );

        return res.status(200).json({

            success: true,

            message: result.message

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// PUBLISH / UNPUBLISH
// ========================================

const togglePublished = async(
    req,
    res,
    next
) => {

    try {

        const certificate =
            await toggleCertificatePublished(

                req.user.userId,

                req.params.certificateId

            );

        return res.status(200).json({

            success: true,

            message: certificate.isPublished ?
                "Certificate published successfully" :
                "Certificate unpublished successfully",

            data: certificate

        });

    } catch (error) {

        next(error);

    }
};


export {

    create,
    getMy,
    getOne,
    update,
    remove,
    togglePublished

};
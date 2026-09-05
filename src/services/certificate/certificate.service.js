import Certificate from "../../models/certificate.model.js";
import Portfolio from "../../models/portfolio.model.js";


// ========================================
// GET USER PORTFOLIO
// ========================================

const getUserPortfolio = async(userId) => {

    const portfolio =
        await Portfolio.findOne({
            owner: userId
        });

    if (!portfolio) {

        const error =
            new Error("Portfolio not found");

        error.statusCode = 404;

        throw error;
    }

    return portfolio;
};


// ========================================
// CREATE CERTIFICATE
// ========================================

const createCertificate = async(
    userId,
    data
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const certificate =
        await Certificate.create({

            portfolio: portfolio._id,

            title: data.title || "",

            issuingOrganization: data.issuingOrganization || "",

            issueDate: data.issueDate || null,

            expiryDate: data.expiryDate || null,

            credentialId: data.credentialId || "",

            credentialUrl: data.credentialUrl || "",

            certificateImage: data.certificateImage || "",

            description: data.description || "",

            skills: data.skills || [],

            order: data.order || 0,

            isPublished: data.isPublished !== undefined ?
                data.isPublished :
                true

        });


    return certificate;
};


// ========================================
// GET MY CERTIFICATES
// ========================================

const getMyCertificates = async(
    userId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    return await Certificate.find({
        portfolio: portfolio._id
    }).sort({
        order: 1,
        issueDate: -1
    });
};


// ========================================
// GET SINGLE CERTIFICATE
// ========================================

const getCertificateById = async(
    userId,
    certificateId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const certificate =
        await Certificate.findOne({

            _id: certificateId,

            portfolio: portfolio._id

        });


    if (!certificate) {

        const error =
            new Error(
                "Certificate not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return certificate;
};


// ========================================
// UPDATE CERTIFICATE
// ========================================

const updateCertificate = async(
    userId,
    certificateId,
    data
) => {

    const certificate =
        await getCertificateById(
            userId,
            certificateId
        );


    const allowedFields = [

        "title",
        "issuingOrganization",
        "issueDate",
        "expiryDate",
        "credentialId",
        "credentialUrl",
        "certificateImage",
        "description",
        "skills",
        "order",
        "isPublished"

    ];


    for (
        const field of allowedFields
    ) {

        if (
            data[field] !== undefined
        ) {

            certificate[field] =
                data[field];

        }

    }


    await certificate.save();


    return certificate;
};


// ========================================
// DELETE CERTIFICATE
// ========================================

const deleteCertificate = async(
    userId,
    certificateId
) => {

    /*
     * Ownership is verified first.
     */

    const certificate =
        await getCertificateById(
            userId,
            certificateId
        );


    /*
     * Delete only the verified
     * certificate.
     */

    const result =
        await Certificate.deleteOne({
            _id: certificate._id
        });


    /*
     * Make sure MongoDB actually
     * deleted the document.
     */

    if (result.deletedCount !== 1) {

        const error =
            new Error(
                "Certificate could not be deleted"
            );

        error.statusCode = 500;

        throw error;
    }


    return {
        message: "Certificate deleted successfully"
    };
};


// ========================================
// TOGGLE PUBLISHED
// ========================================

const toggleCertificatePublished =
    async(
        userId,
        certificateId
    ) => {

        const certificate =
            await getCertificateById(
                userId,
                certificateId
            );


        certificate.isPublished = !certificate.isPublished;


        await certificate.save();


        return certificate;
    };


export {

    createCertificate,

    getMyCertificates,

    getCertificateById,

    updateCertificate,

    deleteCertificate,

    toggleCertificatePublished

};
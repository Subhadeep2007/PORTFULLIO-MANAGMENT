import Education from "../../models/education.model.js";
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
// CREATE EDUCATION
// ========================================

const createEducation = async(
    userId,
    data
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const education =
        await Education.create({

            portfolio: portfolio._id,

            institution: data.institution,

            degree: data.degree,

            fieldOfStudy: data.fieldOfStudy || "",

            location: data.location || "",

            startDate: data.startDate,

            endDate: data.endDate || null,

            currentlyStudying: data.currentlyStudying || false,

            grade: data.grade || "",

            description: data.description || "",

            achievements: data.achievements || [],

            order: data.order || 0,

            isPublished: data.isPublished !== undefined ?
                data.isPublished :
                true

        });


    return education;
};


// ========================================
// GET MY EDUCATION
// ========================================

const getMyEducation = async(
    userId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    return await Education.find({
        portfolio: portfolio._id
    }).sort({
        order: 1,
        startDate: -1
    });
};


// ========================================
// GET SINGLE EDUCATION
// ========================================

const getEducationById = async(
    userId,
    educationId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const education =
        await Education.findOne({

            _id: educationId,

            portfolio: portfolio._id

        });


    if (!education) {

        const error =
            new Error(
                "Education not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return education;
};


// ========================================
// UPDATE EDUCATION
// ========================================

const updateEducation = async(
    userId,
    educationId,
    data
) => {

    const education =
        await getEducationById(
            userId,
            educationId
        );


    const allowedFields = [

        "institution",
        "degree",
        "fieldOfStudy",
        "location",
        "startDate",
        "endDate",
        "currentlyStudying",
        "grade",
        "description",
        "achievements",
        "order",
        "isPublished"

    ];


    for (
        const field of allowedFields
    ) {

        if (
            data[field] !== undefined
        ) {

            education[field] =
                data[field];

        }

    }


    await education.save();


    return education;
};


// ========================================
// DELETE EDUCATION
// ========================================

const deleteEducation = async(
    userId,
    educationId
) => {

    /*
     * First verify that this education
     * belongs to the logged-in user.
     */

    const education =
        await getEducationById(
            userId,
            educationId
        );


    /*
     * Delete only after ownership
     * verification.
     */

    await Education.deleteOne({
        _id: education._id
    });


    /*
     * Verify that deletion actually
     * happened.
     */

    const deletedEducation =
        await Education.findById(
            education._id
        );


    if (deletedEducation) {

        const error =
            new Error(
                "Education could not be deleted"
            );

        error.statusCode = 500;

        throw error;
    }


    return {
        message: "Education deleted successfully"
    };
};


// ========================================
// TOGGLE PUBLISHED
// ========================================

const toggleEducationPublished =
    async(
        userId,
        educationId
    ) => {

        const education =
            await getEducationById(
                userId,
                educationId
            );


        education.isPublished = !education.isPublished;


        await education.save();


        return education;
    };


export {

    createEducation,

    getMyEducation,

    getEducationById,

    updateEducation,

    deleteEducation,

    toggleEducationPublished

};
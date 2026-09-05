import {
    createEducation,
    getMyEducation,
    getEducationById,
    updateEducation,
    deleteEducation,
    toggleEducationPublished
} from "../../services/education/education.service.js";


// ========================================
// CREATE EDUCATION
// ========================================

const create = async(
    req,
    res,
    next
) => {

    try {

        const education =
            await createEducation(
                req.user.userId,
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Education created successfully",

            data: education

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY EDUCATION
// ========================================

const getMy = async(
    req,
    res,
    next
) => {

    try {

        const education =
            await getMyEducation(
                req.user.userId
            );

        return res.status(200).json({

            success: true,

            message: "Education fetched successfully",

            data: education

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET SINGLE EDUCATION
// ========================================

const getOne = async(
    req,
    res,
    next
) => {

    try {

        const education =
            await getEducationById(

                req.user.userId,

                req.params.educationId

            );

        return res.status(200).json({

            success: true,

            message: "Education fetched successfully",

            data: education

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE EDUCATION
// ========================================

const update = async(
    req,
    res,
    next
) => {

    try {

        const education =
            await updateEducation(

                req.user.userId,

                req.params.educationId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Education updated successfully",

            data: education

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE EDUCATION
// ========================================

const remove = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await deleteEducation(

                req.user.userId,

                req.params.educationId

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
// TOGGLE PUBLISHED
// ========================================

const togglePublished = async(
    req,
    res,
    next
) => {

    try {

        const education =
            await toggleEducationPublished(

                req.user.userId,

                req.params.educationId

            );

        return res.status(200).json({

            success: true,

            message: education.isPublished ?
                "Education published successfully" :
                "Education unpublished successfully",

            data: education

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
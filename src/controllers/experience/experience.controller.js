import {
    createExperience,
    getMyExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience,
    toggleExperiencePublished
} from "../../services/experience/experience.service.js";


// ========================================
// CREATE EXPERIENCE
// ========================================

const create = async(
    req,
    res,
    next
) => {

    try {

        const experience =
            await createExperience(
                req.user.userId,
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Experience created successfully",

            data: experience

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY EXPERIENCES
// ========================================

const getMy = async(
    req,
    res,
    next
) => {

    try {

        const experiences =
            await getMyExperiences(
                req.user.userId
            );

        return res.status(200).json({

            success: true,

            message: "Experiences fetched successfully",

            data: experiences

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET SINGLE EXPERIENCE
// ========================================

const getOne = async(
    req,
    res,
    next
) => {

    try {

        const experience =
            await getExperienceById(

                req.user.userId,

                req.params.experienceId

            );

        return res.status(200).json({

            success: true,

            message: "Experience fetched successfully",

            data: experience

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE EXPERIENCE
// ========================================

const update = async(
    req,
    res,
    next
) => {

    try {

        const experience =
            await updateExperience(

                req.user.userId,

                req.params.experienceId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Experience updated successfully",

            data: experience

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE EXPERIENCE
// ========================================

const remove = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await deleteExperience(

                req.user.userId,

                req.params.experienceId

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

        const experience =
            await toggleExperiencePublished(

                req.user.userId,

                req.params.experienceId

            );

        return res.status(200).json({

            success: true,

            message: experience.isPublished ?
                "Experience published successfully" :
                "Experience unpublished successfully",

            data: experience

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
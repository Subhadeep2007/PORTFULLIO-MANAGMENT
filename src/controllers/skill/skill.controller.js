import {
    createSkill,
    getMySkills,
    getSkillById,
    updateSkill,
    deleteSkill,
    toggleSkillPublished
} from "../../services/skill/skill.service.js";


// ========================================
// CREATE SKILL
// ========================================

const create = async(req, res, next) => {

    try {

        const skill =
            await createSkill(
                req.user.userId,
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Skill created successfully",

            data: skill

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY SKILLS
// ========================================

const getMy = async(req, res, next) => {

    try {

        const skills =
            await getMySkills(
                req.user.userId
            );

        return res.status(200).json({

            success: true,

            message: "Skills fetched successfully",

            data: skills

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET SINGLE SKILL
// ========================================

const getOne = async(req, res, next) => {

    try {

        const skill =
            await getSkillById(
                req.user.userId,
                req.params.skillId
            );

        return res.status(200).json({

            success: true,

            message: "Skill fetched successfully",

            data: skill

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE SKILL
// ========================================

const update = async(req, res, next) => {

    try {

        const skill =
            await updateSkill(

                req.user.userId,

                req.params.skillId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Skill updated successfully",

            data: skill

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE SKILL
// ========================================

const remove = async(req, res, next) => {

    try {

        const result =
            await deleteSkill(

                req.user.userId,

                req.params.skillId

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

        const skill =
            await toggleSkillPublished(

                req.user.userId,

                req.params.skillId

            );

        return res.status(200).json({

            success: true,

            message: skill.isPublished ?
                "Skill published successfully" :
                "Skill unpublished successfully",

            data: skill

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
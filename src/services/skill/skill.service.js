import Skill from "../../models/skill.model.js";
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
// CREATE SKILL
// ========================================

const createSkill = async(
    userId,
    data
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const skill =
        await Skill.create({

            portfolio: portfolio._id,

            name: data.name || "",

            category: data.category || "",

            level: data.level || "beginner",

            percentage: data.percentage !== undefined ?
                data.percentage :
                0,

            icon: data.icon || "",

            description: data.description || "",

            order: data.order !== undefined ?
                data.order :
                0,

            isPublished: data.isPublished !== undefined ?
                data.isPublished :
                true

        });


    return skill;
};


// ========================================
// GET MY SKILLS
// ========================================

const getMySkills = async(
    userId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    return await Skill.find({
        portfolio: portfolio._id
    }).sort({
        order: 1,
        createdAt: 1
    });
};


// ========================================
// GET SINGLE SKILL
// ========================================

const getSkillById = async(
    userId,
    skillId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const skill =
        await Skill.findOne({

            _id: skillId,

            portfolio: portfolio._id

        });


    if (!skill) {

        const error =
            new Error("Skill not found");

        error.statusCode = 404;

        throw error;
    }


    return skill;
};


// ========================================
// UPDATE SKILL
// ========================================

const updateSkill = async(
    userId,
    skillId,
    data
) => {

    const skill =
        await getSkillById(
            userId,
            skillId
        );


    const allowedFields = [

        "name",
        "category",
        "level",
        "percentage",
        "icon",
        "description",
        "order",
        "isPublished"

    ];


    for (
        const field of allowedFields
    ) {

        if (
            data[field] !== undefined
        ) {

            skill[field] =
                data[field];

        }

    }


    await skill.save();


    return skill;
};


// ========================================
// DELETE SKILL
// ========================================

const deleteSkill = async(
    userId,
    skillId
) => {

    /*
     * First verify that this skill
     * belongs to the logged-in user's
     * portfolio.
     */

    const skill =
        await getSkillById(
            userId,
            skillId
        );


    /*
     * Delete only the verified skill.
     */

    const result =
        await Skill.deleteOne({
            _id: skill._id
        });


    /*
     * Verify that MongoDB actually
     * deleted the document.
     */

    if (result.deletedCount !== 1) {

        const error =
            new Error(
                "Skill could not be deleted"
            );

        error.statusCode = 500;

        throw error;
    }


    return {
        message: "Skill deleted successfully"
    };
};


// ========================================
// TOGGLE PUBLISHED
// ========================================

const toggleSkillPublished =
    async(
        userId,
        skillId
    ) => {

        const skill =
            await getSkillById(
                userId,
                skillId
            );


        skill.isPublished = !skill.isPublished;


        await skill.save();


        return skill;
    };


export {

    createSkill,

    getMySkills,

    getSkillById,

    updateSkill,

    deleteSkill,

    toggleSkillPublished

};
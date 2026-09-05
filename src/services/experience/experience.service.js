import Experience from "../../models/experience.model.js";
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
// CREATE EXPERIENCE
// ========================================

const createExperience = async(
    userId,
    data
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const experience =
        await Experience.create({

            portfolio: portfolio._id,

            jobTitle: data.jobTitle,

            company: data.company,

            companyUrl: data.companyUrl || "",

            location: data.location || "",

            employmentType: data.employmentType ||
                "full-time",

            startDate: data.startDate,

            endDate: data.endDate || null,

            currentlyWorking: data.currentlyWorking || false,

            description: data.description || "",

            technologies: data.technologies || [],

            achievements: data.achievements || [],

            order: data.order || 0,

            isPublished: data.isPublished !== undefined ?
                data.isPublished :
                true

        });


    return experience;
};


// ========================================
// GET MY EXPERIENCES
// ========================================

const getMyExperiences = async(
    userId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const experiences =
        await Experience.find({
            portfolio: portfolio._id
        })
        .sort({
            order: 1,
            startDate: -1
        });


    return experiences;
};


// ========================================
// GET SINGLE EXPERIENCE
// ========================================

const getExperienceById = async(
    userId,
    experienceId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const experience =
        await Experience.findOne({

            _id: experienceId,

            portfolio: portfolio._id

        });


    if (!experience) {

        const error =
            new Error(
                "Experience not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return experience;
};


// ========================================
// UPDATE EXPERIENCE
// ========================================

const updateExperience = async(
    userId,
    experienceId,
    data
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const experience =
        await Experience.findOne({

            _id: experienceId,

            portfolio: portfolio._id

        });


    if (!experience) {

        const error =
            new Error(
                "Experience not found"
            );

        error.statusCode = 404;

        throw error;
    }


    const allowedFields = [

        "jobTitle",
        "company",
        "companyUrl",
        "location",
        "employmentType",
        "startDate",
        "endDate",
        "currentlyWorking",
        "description",
        "technologies",
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

            experience[field] =
                data[field];

        }

    }


    await experience.save();


    return experience;
};


// ========================================
// DELETE EXPERIENCE
// ========================================

const deleteExperience = async(
    userId,
    experienceId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const experience =
        await Experience.findOne({

            _id: experienceId,

            portfolio: portfolio._id

        });


    if (!experience) {

        const error =
            new Error(
                "Experience not found"
            );

        error.statusCode = 404;

        throw error;
    }


    await Experience.findByIdAndDelete(
        experience._id
    );


    return {
        message: "Experience deleted successfully"
    };
};


// ========================================
// TOGGLE PUBLISHED
// ========================================

const toggleExperiencePublished =
    async(
        userId,
        experienceId
    ) => {

        const portfolio =
            await getUserPortfolio(userId);


        const experience =
            await Experience.findOne({

                _id: experienceId,

                portfolio: portfolio._id

            });


        if (!experience) {

            const error =
                new Error(
                    "Experience not found"
                );

            error.statusCode = 404;

            throw error;
        }


        experience.isPublished = !experience.isPublished;


        await experience.save();


        return experience;
    };


export {

    createExperience,

    getMyExperiences,

    getExperienceById,

    updateExperience,

    deleteExperience,

    toggleExperiencePublished

};
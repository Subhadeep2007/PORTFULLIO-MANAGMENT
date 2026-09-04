import Portfolio from "../../models/portfolio.model.js";


// ========================================
// CREATE PORTFOLIO
// ========================================

const createPortfolio = async(userId, data) => {

    const existingPortfolio = await Portfolio.findOne({
        owner: userId
    });

    if (existingPortfolio) {
        const error = new Error(
            "You already have a portfolio"
        );

        error.statusCode = 409;

        throw error;
    }


    const existingUsername = await Portfolio.findOne({
        username: data.username.toLowerCase()
    });

    if (existingUsername) {
        const error = new Error(
            "Username is already taken"
        );

        error.statusCode = 409;

        throw error;
    }


    const existingSlug = await Portfolio.findOne({
        slug: data.slug.toLowerCase()
    });

    if (existingSlug) {
        const error = new Error(
            "Portfolio slug is already taken"
        );

        error.statusCode = 409;

        throw error;
    }


    const portfolio = await Portfolio.create({

        owner: userId,

        username: data.username.toLowerCase(),

        slug: data.slug.toLowerCase(),

        title: data.title || "",

        headline: data.headline || "",

        bio: data.bio || "",

        profileImage: data.profileImage || "",

        location: data.location || "",

        email: data.email || "",

        phone: data.phone || "",

        github: data.github || "",

        linkedin: data.linkedin || "",

        twitter: data.twitter || "",

        instagram: data.instagram || "",

        youtube: data.youtube || "",

        website: data.website || "",

        resume: data.resume || {},

        theme: data.theme || "system",

        template: data.template || "modern",

        customization: data.customization || {},

        seo: data.seo || {},

        isPublished: false

    });


    return portfolio;
};


// ========================================
// GET MY PORTFOLIO
// ========================================

const getMyPortfolio = async(userId) => {

    const portfolio = await Portfolio.findOne({
        owner: userId
    }).populate(
        "owner",
        "name email profileImage role"
    );


    if (!portfolio) {

        const error = new Error(
            "Portfolio not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return portfolio;
};


// ========================================
// GET PUBLIC PORTFOLIO
// ========================================

const getPublicPortfolio = async(slug) => {

    const portfolio = await Portfolio.findOne({

        slug: slug.toLowerCase(),

        isPublished: true,

        isActive: true

    }).populate(
        "owner",
        "name profileImage"
    );


    if (!portfolio) {

        const error = new Error(
            "Portfolio not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return portfolio;
};


// ========================================
// UPDATE PORTFOLIO
// ========================================

const updatePortfolio = async(
    userId,
    data
) => {

    const portfolio = await Portfolio.findOne({
        owner: userId
    });


    if (!portfolio) {

        const error = new Error(
            "Portfolio not found"
        );

        error.statusCode = 404;

        throw error;
    }


    // ====================================
    // USERNAME CHANGE
    // ====================================

    if (
        data.username &&
        data.username.toLowerCase() !==
        portfolio.username
    ) {

        const existingUsername =
            await Portfolio.findOne({

                username: data.username.toLowerCase(),

                _id: {
                    $ne: portfolio._id
                }

            });


        if (existingUsername) {

            const error = new Error(
                "Username is already taken"
            );

            error.statusCode = 409;

            throw error;
        }


        portfolio.username =
            data.username.toLowerCase();
    }


    // ====================================
    // SLUG CHANGE
    // ====================================

    if (
        data.slug &&
        data.slug.toLowerCase() !==
        portfolio.slug
    ) {

        const existingSlug =
            await Portfolio.findOne({

                slug: data.slug.toLowerCase(),

                _id: {
                    $ne: portfolio._id
                }

            });


        if (existingSlug) {

            const error = new Error(
                "Portfolio slug is already taken"
            );

            error.statusCode = 409;

            throw error;
        }


        portfolio.slug =
            data.slug.toLowerCase();
    }


    // ====================================
    // BASIC INFORMATION
    // ====================================

    const allowedFields = [

        "title",
        "headline",
        "bio",
        "profileImage",
        "location",
        "email",
        "phone",

        "github",
        "linkedin",
        "twitter",
        "instagram",
        "youtube",
        "website",

        "resume",

        "theme",
        "template",

        "customization",

        "showContactSection",
        "showProjectsSection",
        "showSkillsSection",
        "showExperienceSection",
        "showEducationSection",
        "showCertificatesSection",
        "showPostsSection",

        "seo"

    ];


    for (const field of allowedFields) {

        if (
            data[field] !== undefined
        ) {

            portfolio[field] =
                data[field];

        }
    }


    await portfolio.save();


    return portfolio;
};


// ========================================
// PUBLISH PORTFOLIO
// ========================================

const publishPortfolio = async(userId) => {

    const portfolio = await Portfolio.findOne({
        owner: userId
    });


    if (!portfolio) {

        const error = new Error(
            "Portfolio not found"
        );

        error.statusCode = 404;

        throw error;
    }


    portfolio.isPublished = true;

    await portfolio.save();


    return portfolio;
};


// ========================================
// UNPUBLISH PORTFOLIO
// ========================================

const unpublishPortfolio = async(userId) => {

    const portfolio = await Portfolio.findOne({
        owner: userId
    });


    if (!portfolio) {

        const error = new Error(
            "Portfolio not found"
        );

        error.statusCode = 404;

        throw error;
    }


    portfolio.isPublished = false;

    await portfolio.save();


    return portfolio;
};


// ========================================
// DELETE PORTFOLIO
// ========================================

const deletePortfolio = async(userId) => {

    const portfolio = await Portfolio.findOne({
        owner: userId
    });


    if (!portfolio) {

        const error = new Error(
            "Portfolio not found"
        );

        error.statusCode = 404;

        throw error;
    }


    await Portfolio.findByIdAndDelete(
        portfolio._id
    );


    return {
        message: "Portfolio deleted successfully"
    };
};


export {
    createPortfolio,
    getMyPortfolio,
    getPublicPortfolio,
    updatePortfolio,
    publishPortfolio,
    unpublishPortfolio,
    deletePortfolio
};
import Project from "../../models/project.model.js";
import Portfolio from "../../models/portfolio.model.js";


// ========================================
// CREATE PROJECT
// ========================================

const createProject = async(
    userId,
    data
) => {

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


    const project =
        await Project.create({

            portfolio: portfolio._id,

            title: data.title,

            description: data.description,

            image: data.image || "",

            technologies: data.technologies || [],

            githubUrl: data.githubUrl || "",

            liveUrl: data.liveUrl || "",

            category: data.category || "",

            featured: data.featured || false,

            order: data.order || 0,

            isPublished: data.isPublished !== undefined ?
                data.isPublished :
                true

        });


    return project;
};


// ========================================
// GET MY PROJECTS
// ========================================

const getMyProjects = async(
    userId
) => {

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


    const projects =
        await Project.find({
            portfolio: portfolio._id
        })
        .sort({
            order: 1,
            createdAt: -1
        });


    return projects;
};


// ========================================
// GET PUBLIC PROJECTS
// ========================================

const getPublicProjects = async(
    portfolioId
) => {

    const projects =
        await Project.find({

            portfolio: portfolioId,

            isPublished: true

        })
        .sort({
            order: 1,
            createdAt: -1
        });


    return projects;
};


// ========================================
// GET SINGLE PROJECT
// ========================================

const getProjectById = async(
    userId,
    projectId
) => {

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


    const project =
        await Project.findOne({

            _id: projectId,

            portfolio: portfolio._id

        });


    if (!project) {

        const error =
            new Error("Project not found");

        error.statusCode = 404;

        throw error;
    }


    return project;
};


// ========================================
// UPDATE PROJECT
// ========================================

const updateProject = async(
    userId,
    projectId,
    data
) => {

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


    const project =
        await Project.findOne({

            _id: projectId,

            portfolio: portfolio._id

        });


    if (!project) {

        const error =
            new Error("Project not found");

        error.statusCode = 404;

        throw error;
    }


    const allowedFields = [

        "title",

        "description",

        "image",

        "technologies",

        "githubUrl",

        "liveUrl",

        "category",

        "featured",

        "order",

        "isPublished"

    ];


    for (
        const field of allowedFields
    ) {

        if (
            data[field] !== undefined
        ) {

            project[field] =
                data[field];

        }

    }


    await project.save();


    return project;
};


// ========================================
// DELETE PROJECT
// ========================================

const deleteProject = async(
    userId,
    projectId
) => {

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


    const project =
        await Project.findOne({

            _id: projectId,

            portfolio: portfolio._id

        });


    if (!project) {

        const error =
            new Error("Project not found");

        error.statusCode = 404;

        throw error;
    }


    await Project.findByIdAndDelete(
        project._id
    );


    return {
        message: "Project deleted successfully"
    };
};


// ========================================
// FEATURE / UNFEATURE PROJECT
// ========================================

const toggleFeaturedProject = async(
    userId,
    projectId
) => {

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


    const project =
        await Project.findOne({

            _id: projectId,

            portfolio: portfolio._id

        });


    if (!project) {

        const error =
            new Error("Project not found");

        error.statusCode = 404;

        throw error;
    }


    project.featured = !project.featured;


    await project.save();


    return project;
};


// ========================================
// PUBLISH / UNPUBLISH PROJECT
// ========================================

const toggleProjectPublished = async(
    userId,
    projectId
) => {

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


    const project =
        await Project.findOne({

            _id: projectId,

            portfolio: portfolio._id

        });


    if (!project) {

        const error =
            new Error("Project not found");

        error.statusCode = 404;

        throw error;
    }


    project.isPublished = !project.isPublished;


    await project.save();


    return project;
};


export {

    createProject,

    getMyProjects,

    getPublicProjects,

    getProjectById,

    updateProject,

    deleteProject,

    toggleFeaturedProject,

    toggleProjectPublished

};
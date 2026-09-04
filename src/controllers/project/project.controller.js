import {
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    toggleFeaturedProject,
    toggleProjectPublished
} from "../../services/project/project.service.js";


// ========================================
// CREATE PROJECT
// ========================================

const create = async(
    req,
    res,
    next
) => {

    try {

        const project =
            await createProject(
                req.user.userId,
                req.body
            );


        return res.status(201).json({

            success: true,

            message: "Project created successfully",

            data: project

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY PROJECTS
// ========================================

const getMy = async(
    req,
    res,
    next
) => {

    try {

        const projects =
            await getMyProjects(
                req.user.userId
            );


        return res.status(200).json({

            success: true,

            message: "Projects fetched successfully",

            data: projects

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET SINGLE PROJECT
// ========================================

const getOne = async(
    req,
    res,
    next
) => {

    try {

        const project =
            await getProjectById(

                req.user.userId,

                req.params.projectId

            );


        return res.status(200).json({

            success: true,

            message: "Project fetched successfully",

            data: project

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE PROJECT
// ========================================

const update = async(
    req,
    res,
    next
) => {

    try {

        const project =
            await updateProject(

                req.user.userId,

                req.params.projectId,

                req.body

            );


        return res.status(200).json({

            success: true,

            message: "Project updated successfully",

            data: project

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE PROJECT
// ========================================

const remove = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await deleteProject(

                req.user.userId,

                req.params.projectId

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
// TOGGLE FEATURED
// ========================================

const toggleFeatured = async(
    req,
    res,
    next
) => {

    try {

        const project =
            await toggleFeaturedProject(

                req.user.userId,

                req.params.projectId

            );


        return res.status(200).json({

            success: true,

            message: project.featured ?
                "Project marked as featured" :
                "Project removed from featured",

            data: project

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

        const project =
            await toggleProjectPublished(

                req.user.userId,

                req.params.projectId

            );


        return res.status(200).json({

            success: true,

            message: project.isPublished ?
                "Project published successfully" :
                "Project unpublished successfully",

            data: project

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

    toggleFeatured,

    togglePublished

};
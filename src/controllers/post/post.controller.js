import {
    createPost,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost,
    togglePostPublished,
    togglePostFeatured,
    incrementPostViews
} from "../../services/post/post.service.js";


// ========================================
// CREATE POST
// ========================================

const create = async(
    req,
    res,
    next
) => {

    try {

        const post =
            await createPost(
                req.user.userId,
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Post created successfully",

            data: post

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY POSTS
// ========================================

const getMy = async(
    req,
    res,
    next
) => {

    try {

        const posts =
            await getMyPosts(
                req.user.userId
            );

        return res.status(200).json({

            success: true,

            message: "Posts fetched successfully",

            data: posts

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET SINGLE POST
// ========================================

const getOne = async(
    req,
    res,
    next
) => {

    try {

        const post =
            await getPostById(
                req.user.userId,
                req.params.postId
            );

        return res.status(200).json({

            success: true,

            message: "Post fetched successfully",

            data: post

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE POST
// ========================================

const update = async(
    req,
    res,
    next
) => {

    try {

        const post =
            await updatePost(

                req.user.userId,

                req.params.postId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Post updated successfully",

            data: post

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE POST
// ========================================

const remove = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await deletePost(

                req.user.userId,

                req.params.postId

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

        const post =
            await togglePostPublished(

                req.user.userId,

                req.params.postId

            );

        return res.status(200).json({

            success: true,

            message: post.isPublished ?
                "Post published successfully" :
                "Post unpublished successfully",

            data: post

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// FEATURE / UNFEATURE
// ========================================

const toggleFeatured = async(
    req,
    res,
    next
) => {

    try {

        const post =
            await togglePostFeatured(

                req.user.userId,

                req.params.postId

            );

        return res.status(200).json({

            success: true,

            message: post.isFeatured ?
                "Post featured successfully" :
                "Post unfeatured successfully",

            data: post

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// INCREMENT VIEWS
// ========================================

const incrementViews = async(
    req,
    res,
    next
) => {

    try {

        const post =
            await incrementPostViews(
                req.params.postId
            );

        return res.status(200).json({

            success: true,

            message: "Post view recorded",

            data: {

                views: post.views

            }

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
    togglePublished,
    toggleFeatured,
    incrementViews

};
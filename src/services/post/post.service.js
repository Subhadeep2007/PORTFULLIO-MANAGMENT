import Post from "../../models/post.model.js";
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
// CREATE POST
// ========================================

const createPost = async(
    userId,
    data
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const post =
        await Post.create({

            portfolio: portfolio._id,

            title: data.title || "",

            slug: data.slug || "",

            excerpt: data.excerpt || "",

            content: data.content || "",

            coverImage: data.coverImage || "",

            postType: data.postType || "blog",

            tags: data.tags || [],

            technologies: data.technologies || [],

            githubUrl: data.githubUrl || "",

            demoUrl: data.demoUrl || "",

            externalUrl: data.externalUrl || "",

            isFeatured: data.isFeatured !== undefined ?
                data.isFeatured :
                false,

            isPublished: data.isPublished !== undefined ?
                data.isPublished :
                false,

            publishedAt: data.isPublished ?
                new Date() :
                null,

            order: data.order !== undefined ?
                data.order :
                0

        });


    return post;
};


// ========================================
// GET MY POSTS
// ========================================

const getMyPosts = async(
    userId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    return await Post.find({
        portfolio: portfolio._id
    }).sort({
        order: 1,
        createdAt: -1
    });
};


// ========================================
// GET SINGLE POST
// ========================================

const getPostById = async(
    userId,
    postId
) => {

    const portfolio =
        await getUserPortfolio(userId);


    const post =
        await Post.findOne({

            _id: postId,

            portfolio: portfolio._id

        });


    if (!post) {

        const error =
            new Error("Post not found");

        error.statusCode = 404;

        throw error;
    }


    return post;
};


// ========================================
// UPDATE POST
// ========================================

const updatePost = async(
    userId,
    postId,
    data
) => {

    const post =
        await getPostById(
            userId,
            postId
        );


    const allowedFields = [

        "title",
        "slug",
        "excerpt",
        "content",
        "coverImage",
        "postType",
        "tags",
        "technologies",
        "githubUrl",
        "demoUrl",
        "externalUrl",
        "isFeatured",
        "isPublished",
        "order"

    ];


    for (
        const field of allowedFields
    ) {

        if (
            data[field] !== undefined
        ) {

            post[field] =
                data[field];

        }

    }


    /*
     * Automatically manage publishedAt.
     */

    if (
        data.isPublished === true &&
        !post.publishedAt
    ) {

        post.publishedAt =
            new Date();

    }


    if (
        data.isPublished === false
    ) {

        post.publishedAt =
            null;

    }


    await post.save();


    return post;
};


// ========================================
// DELETE POST
// ========================================

const deletePost = async(
    userId,
    postId
) => {

    const post =
        await getPostById(
            userId,
            postId
        );


    const result =
        await Post.deleteOne({
            _id: post._id
        });


    if (
        result.deletedCount !== 1
    ) {

        const error =
            new Error(
                "Post could not be deleted"
            );

        error.statusCode = 500;

        throw error;
    }


    return {

        message: "Post deleted successfully"

    };
};


// ========================================
// TOGGLE PUBLISHED
// ========================================

const togglePostPublished =
    async(
        userId,
        postId
    ) => {

        const post =
            await getPostById(
                userId,
                postId
            );


        post.isPublished = !post.isPublished;


        if (post.isPublished) {

            if (!post.publishedAt) {

                post.publishedAt =
                    new Date();

            }

        } else {

            post.publishedAt =
                null;

        }


        await post.save();


        return post;
    };


// ========================================
// TOGGLE FEATURED
// ========================================

const togglePostFeatured =
    async(
        userId,
        postId
    ) => {

        const post =
            await getPostById(
                userId,
                postId
            );


        post.isFeatured = !post.isFeatured;


        await post.save();


        return post;
    };


// ========================================
// INCREMENT VIEWS
// ========================================

const incrementPostViews =
    async(postId) => {

        const post =
            await Post.findOneAndUpdate(

                {
                    _id: postId,

                    isPublished: true

                },

                {
                    $inc: {
                        views: 1
                    }

                },

                {
                    new: true
                }

            );


        if (!post) {

            const error =
                new Error("Post not found");

            error.statusCode = 404;

            throw error;
        }


        return post;
    };


export {

    createPost,

    getMyPosts,

    getPostById,

    updatePost,

    deletePost,

    togglePostPublished,

    togglePostFeatured,

    incrementPostViews

};
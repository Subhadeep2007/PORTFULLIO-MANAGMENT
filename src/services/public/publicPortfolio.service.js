import Portfolio from "../../models/portfolio.model.js";
import Post from "../../models/post.model.js";


// ========================================
// GET PUBLIC PORTFOLIO
// ========================================

const getPublicPortfolio = async(username) => {

    const portfolio =
        await Portfolio.findOne({

            username: username,

            isPublished: true

        })
        .populate(
            "owner",
            "name email profileImage"
        )
        .lean();


    if (!portfolio) {

        const error =
            new Error(
                "Portfolio not found"
            );

        error.statusCode = 404;

        throw error;
    }


    // ========================================
    // GET PUBLISHED POSTS
    // ========================================

    const posts =
        await Post.find({

            portfolio: portfolio._id,

            isPublished: true

        })
        .sort({

            isFeatured: -1,

            order: 1,

            publishedAt: -1

        })
        .lean();


    return {

        portfolio,

        posts

    };
};


// ========================================
// GET PUBLIC POST
// ========================================

const getPublicPost = async(
    username,
    slug
) => {

    const portfolio =
        await Portfolio.findOne({

            username: username,

            isPublished: true

        }).lean();


    if (!portfolio) {

        const error =
            new Error(
                "Portfolio not found"
            );

        error.statusCode = 404;

        throw error;
    }


    const post =
        await Post.findOne({

            portfolio: portfolio._id,

            slug: slug,

            isPublished: true

        }).lean();


    if (!post) {

        const error =
            new Error(
                "Post not found"
            );

        error.statusCode = 404;

        throw error;
    }


    return {

        portfolio: {

            username: portfolio.username,

            title: portfolio.title,

            headline: portfolio.headline,

            profileImage: portfolio.profileImage

        },

        post

    };
};


export {
    getPublicPortfolio,
    getPublicPost
};
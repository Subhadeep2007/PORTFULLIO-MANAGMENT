import {
    createPortfolio,
    getMyPortfolio,
    getPublicPortfolio,
    updatePortfolio,
    publishPortfolio,
    unpublishPortfolio,
    deletePortfolio
} from "../../services/portfolio/portfolio.service.js";


// ========================================
// CREATE PORTFOLIO
// ========================================

const create = async(
    req,
    res,
    next
) => {

    try {

        const portfolio =
            await createPortfolio(
                req.user.userId,
                req.body
            );


        return res.status(201).json({

            success: true,

            message: "Portfolio created successfully",

            data: portfolio

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET MY PORTFOLIO
// ========================================

const getMy = async(
    req,
    res,
    next
) => {

    try {

        const portfolio =
            await getMyPortfolio(
                req.user.userId
            );


        return res.status(200).json({

            success: true,

            message: "Portfolio fetched successfully",

            data: portfolio

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET PUBLIC PORTFOLIO
// ========================================

const getPublic = async(
    req,
    res,
    next
) => {

    try {

        const portfolio =
            await getPublicPortfolio(
                req.params.slug
            );


        return res.status(200).json({

            success: true,

            message: "Portfolio fetched successfully",

            data: portfolio

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UPDATE PORTFOLIO
// ========================================

const update = async(
    req,
    res,
    next
) => {

    try {

        const portfolio =
            await updatePortfolio(

                req.user.userId,

                req.body

            );


        return res.status(200).json({

            success: true,

            message: "Portfolio updated successfully",

            data: portfolio

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// PUBLISH PORTFOLIO
// ========================================

const publish = async(
    req,
    res,
    next
) => {

    try {

        const portfolio =
            await publishPortfolio(
                req.user.userId
            );


        return res.status(200).json({

            success: true,

            message: "Portfolio published successfully",

            data: portfolio

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// UNPUBLISH PORTFOLIO
// ========================================

const unpublish = async(
    req,
    res,
    next
) => {

    try {

        const portfolio =
            await unpublishPortfolio(
                req.user.userId
            );


        return res.status(200).json({

            success: true,

            message: "Portfolio unpublished successfully",

            data: portfolio

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// DELETE PORTFOLIO
// ========================================

const remove = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await deletePortfolio(
                req.user.userId
            );


        return res.status(200).json({

            success: true,

            message: result.message

        });

    } catch (error) {

        next(error);

    }
};


export {

    create,

    getMy,

    getPublic,

    update,

    publish,

    unpublish,

    remove

};
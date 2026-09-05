import {
    getPublicPortfolio,
    getPublicPost
} from "../../services/public/publicPortfolio.service.js";


// ========================================
// GET PUBLIC PORTFOLIO
// ========================================

const getPortfolio = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await getPublicPortfolio(
                req.params.username
            );

        return res.status(200).json({

            success: true,

            message: "Public portfolio fetched successfully",

            data: result

        });

    } catch (error) {

        next(error);

    }
};


// ========================================
// GET PUBLIC POST
// ========================================

const getPost = async(
    req,
    res,
    next
) => {

    try {

        const result =
            await getPublicPost(

                req.params.username,

                req.params.slug

            );

        return res.status(200).json({

            success: true,

            message: "Public post fetched successfully",

            data: result

        });

    } catch (error) {

        next(error);

    }
};


export {
    getPortfolio,
    getPost
};
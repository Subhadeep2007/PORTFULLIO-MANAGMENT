import rateLimit from "express-rate-limit";

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 10, // maximum 10 requests

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many authentication requests. Please try again after 15 minutes."
    }
});

export default authRateLimiter;
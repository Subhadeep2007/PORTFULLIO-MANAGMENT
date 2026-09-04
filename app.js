import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes from "./src/routes/auth.routes.js";
import portfolioRoutes from "./src/routes/portfolio.routes.js";
import projectRoutes from "./src/routes/project.routes.js";
const app = express();


// ===============================
// SECURITY
// ===============================

app.use(helmet());


// ===============================
// CORS
// ===============================

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);


// ===============================
// BODY PARSER
// ===============================

app.use(
    express.json({
        limit: "10mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);


// ===============================
// COOKIE
// ===============================

app.use(cookieParser());


// ===============================
// HEALTH CHECK
// ===============================

app.get(
    "/",
    (req, res) => {

        return res.status(200).json({
            success: true,
            message: "Portfolio Builder API is running"
        });
    }
);


// ===============================
// AUTH ROUTES
// ===============================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/portfolio",
    portfolioRoutes
);

app.use(
    "/api/projects",
    projectRoutes
);
// ===============================
// 404
// ===============================

app.use(
    (req, res) => {

        return res.status(404).json({
            success: false,
            message: "Route not found"
        });
    }
);


// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use(
    (error, req, res, next) => {

        console.error(error);

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,

            message: error.message ||
                "Internal server error"
        });
    }
);


export default app;
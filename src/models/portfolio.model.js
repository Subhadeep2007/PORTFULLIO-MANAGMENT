import mongoose from "mongoose";


const portfolioSchema = new mongoose.Schema({

    // ========================================
    // OWNER
    // ========================================

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true
    },


    // ========================================
    // PUBLIC IDENTITY
    // ========================================

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        match: [
            /^[a-z0-9_]+$/,
            "Username can only contain lowercase letters, numbers and underscores"
        ]
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },


    // ========================================
    // BASIC INFORMATION
    // ========================================

    title: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ""
    },

    headline: {
        type: String,
        trim: true,
        maxlength: 200,
        default: ""
    },

    bio: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ""
    },


    // ========================================
    // PROFILE IMAGE
    // ========================================

    profileImage: {
        type: String,
        default: ""
    },


    // ========================================
    // CONTACT INFORMATION
    // ========================================

    location: {
        type: String,
        trim: true,
        maxlength: 150,
        default: ""
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: ""
    },

    phone: {
        type: String,
        trim: true,
        maxlength: 30,
        default: ""
    },


    // ========================================
    // SOCIAL LINKS
    // ========================================

    github: {
        type: String,
        trim: true,
        default: ""
    },

    linkedin: {
        type: String,
        trim: true,
        default: ""
    },

    twitter: {
        type: String,
        trim: true,
        default: ""
    },

    instagram: {
        type: String,
        trim: true,
        default: ""
    },

    youtube: {
        type: String,
        trim: true,
        default: ""
    },

    website: {
        type: String,
        trim: true,
        default: ""
    },


    // ========================================
    // RESUME
    // ========================================

    resume: {
        url: {
            type: String,
            default: ""
        },

        publicId: {
            type: String,
            default: ""
        },

        fileName: {
            type: String,
            default: ""
        }
    },


    // ========================================
    // PORTFOLIO DESIGN
    // ========================================

    theme: {
        type: String,
        enum: [
            "light",
            "dark",
            "system",
            "custom"
        ],
        default: "system"
    },

    template: {
        type: String,
        enum: [
            "modern",
            "minimal",
            "developer",
            "creative"
        ],
        default: "modern"
    },


    // ========================================
    // CUSTOMIZATION
    // ========================================

    customization: {

        primaryColor: {
            type: String,
            default: ""
        },

        secondaryColor: {
            type: String,
            default: ""
        },

        font: {
            type: String,
            default: ""
        },

        borderRadius: {
            type: String,
            default: ""
        }
    },


    // ========================================
    // PORTFOLIO SETTINGS
    // ========================================

    isPublished: {
        type: Boolean,
        default: false,
        index: true
    },

    showContactSection: {
        type: Boolean,
        default: true
    },

    showProjectsSection: {
        type: Boolean,
        default: true
    },

    showSkillsSection: {
        type: Boolean,
        default: true
    },

    showExperienceSection: {
        type: Boolean,
        default: true
    },

    showEducationSection: {
        type: Boolean,
        default: true
    },

    showCertificatesSection: {
        type: Boolean,
        default: true
    },

    showPostsSection: {
        type: Boolean,
        default: true
    },


    // ========================================
    // SEO
    // ========================================

    seo: {

        metaTitle: {
            type: String,
            trim: true,
            maxlength: 160,
            default: ""
        },

        metaDescription: {
            type: String,
            trim: true,
            maxlength: 320,
            default: ""
        },

        keywords: {
            type: [String],
            default: []
        },

        ogImage: {
            type: String,
            default: ""
        }
    },


    // ========================================
    // ANALYTICS
    // ========================================

    views: {
        type: Number,
        default: 0,
        min: 0
    },


    // ========================================
    // PORTFOLIO STATUS
    // ========================================

    isActive: {
        type: Boolean,
        default: true,
        index: true
    }

}, {
    timestamps: true
});


const Portfolio =
    mongoose.models.Portfolio ||
    mongoose.model(
        "Portfolio",
        portfolioSchema
    );


export default Portfolio;
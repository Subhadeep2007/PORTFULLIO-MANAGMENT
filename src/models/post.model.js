import mongoose from "mongoose";


const postSchema = new mongoose.Schema({

    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true
    },

    title: {
        type: String,
        trim: true,
        maxlength: 200,
        default: ""
    },

    slug: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: 250,
        default: ""
    },

    excerpt: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    },

    content: {
        type: String,
        default: ""
    },

    coverImage: {
        type: String,
        trim: true,
        default: ""
    },

    postType: {
        type: String,
        enum: [
            "blog",
            "project",
            "achievement",
            "announcement"
        ],
        default: "blog"
    },

    tags: {
        type: [String],
        default: []
    },

    technologies: {
        type: [String],
        default: []
    },

    githubUrl: {
        type: String,
        trim: true,
        default: ""
    },

    demoUrl: {
        type: String,
        trim: true,
        default: ""
    },

    externalUrl: {
        type: String,
        trim: true,
        default: ""
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    isPublished: {
        type: Boolean,
        default: false
    },

    publishedAt: {
        type: Date,
        default: null
    },

    views: {
        type: Number,
        default: 0,
        min: 0
    },

    order: {
        type: Number,
        default: 0,
        min: 0
    }

}, {
    timestamps: true
});


postSchema.index({
    portfolio: 1,
    slug: 1
});


postSchema.index({
    portfolio: 1,
    isPublished: 1
});


const Post =
    mongoose.models.Post ||
    mongoose.model(
        "Post",
        postSchema
    );


export default Post;
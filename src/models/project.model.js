import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({

    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },

    image: {
        type: String,
        default: ""
    },

    technologies: {
        type: [String],
        default: []
    },

    githubUrl: {
        type: String,
        default: ""
    },

    liveUrl: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        trim: true,
        default: ""
    },

    featured: {
        type: Boolean,
        default: false
    },

    order: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});


const Project =
    mongoose.models.Project ||
    mongoose.model("Project", projectSchema);


export default Project;
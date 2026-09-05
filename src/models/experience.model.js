import mongoose from "mongoose";


const experienceSchema = new mongoose.Schema({

    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true
    },

    jobTitle: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    company: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    companyUrl: {
        type: String,
        trim: true,
        default: ""
    },

    location: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ""
    },

    employmentType: {
        type: String,
        enum: [
            "full-time",
            "part-time",
            "internship",
            "freelance",
            "contract"
        ],
        default: "full-time"
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        default: null
    },

    currentlyWorking: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
        trim: true,
        maxlength: 3000,
        default: ""
    },

    technologies: {
        type: [String],
        default: []
    },

    achievements: {
        type: [String],
        default: []
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


const Experience =
    mongoose.models.Experience ||
    mongoose.model(
        "Experience",
        experienceSchema
    );


export default Experience;
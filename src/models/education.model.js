import mongoose from "mongoose";


const educationSchema = new mongoose.Schema({

    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true
    },

    institution: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    degree: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    fieldOfStudy: {
        type: String,
        trim: true,
        maxlength: 150,
        default: ""
    },

    location: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ""
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        default: null
    },

    currentlyStudying: {
        type: Boolean,
        default: false
    },

    grade: {
        type: String,
        trim: true,
        maxlength: 50,
        default: ""
    },

    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ""
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


const Education =
    mongoose.models.Education ||
    mongoose.model(
        "Education",
        educationSchema
    );


export default Education;
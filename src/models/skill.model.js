import mongoose from "mongoose";


const skillSchema = new mongoose.Schema({

    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true
    },

    name: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ""
    },

    category: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ""
    },

    level: {
        type: String,
        enum: [
            "beginner",
            "intermediate",
            "advanced",
            "expert"
        ],
        default: "beginner"
    },

    percentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    icon: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    },

    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    },

    order: {
        type: Number,
        min: 0,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});


const Skill =
    mongoose.models.Skill ||
    mongoose.model(
        "Skill",
        skillSchema
    );


export default Skill;
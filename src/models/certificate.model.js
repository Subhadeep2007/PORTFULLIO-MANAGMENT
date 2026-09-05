import mongoose from "mongoose";


const certificateSchema = new mongoose.Schema({

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

    issuingOrganization: {
        type: String,
        trim: true,
        maxlength: 200,
        default: ""
    },

    issueDate: {
        type: Date,
        default: null
    },

    expiryDate: {
        type: Date,
        default: null
    },

    credentialId: {
        type: String,
        trim: true,
        maxlength: 150,
        default: ""
    },

    credentialUrl: {
        type: String,
        trim: true,
        default: ""
    },

    certificateImage: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ""
    },

    skills: {
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


const Certificate =
    mongoose.models.Certificate ||
    mongoose.model(
        "Certificate",
        certificateSchema
    );


export default Certificate;
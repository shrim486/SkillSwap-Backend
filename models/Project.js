const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        techStack: {
            type: [String],
            default: []
        },

        githubLink: {
            type: String,
            default: ""
        },

        liveLink: {
            type: String,
            default: ""
        },

        projectImage: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Project",
    projectSchema
);
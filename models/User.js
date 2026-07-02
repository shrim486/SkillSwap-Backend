const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    college: {
        type: String,
        default: ""
    },

    branch: {
        type: String,
        default: ""
    },

    year: {
        type: String,
        default: ""
    },

    githubUsername: {
        type: String,
        default: ""
    },

    linkedinUsername: {
        type: String,
        default: ""
    },

    skills: {
        type: [String],
        default: []
    },

    lookingFor: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "User",
    userSchema
);
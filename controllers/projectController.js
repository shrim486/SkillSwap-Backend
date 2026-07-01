const Project = require("../models/Project");

const createProject = async (req, res) => {

    try {

        const {
            title,
            description,
            techStack,
            githubLink
        } = req.body;

        const project = await Project.create({

            title,
            description,
            techStack,
            githubLink,

            createdBy: req.user

        });

        res.status(201).json(project);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const getMyProjects = async (req, res) => {

    try {

        console.log("USER ID:", req.user);

        const projects = await Project.find({
            createdBy: req.user
        });

        console.log("PROJECTS FOUND:", projects);

        res.json(projects);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getProjectsByUser = async (req, res) => {

    try {

        console.log("PARAM ID:", req.params.id);

        const projects = await Project.find({
            createdBy: req.params.id
        });

        console.log("FOUND PROJECTS:", projects);

        res.json(projects);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    createProject,
    getMyProjects,
    getProjectsByUser
};
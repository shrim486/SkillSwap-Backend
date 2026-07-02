const Project = require("../models/Project");


// CREATE PROJECT
const createProject = async (req, res) => {

    try {

        const {

            title,
            description,
            techStack,
            githubLink,
            liveLink,
            projectImage

        } = req.body;


        const project =
            await Project.create({

                title,
                description,
                techStack,
                githubLink,
                liveLink,
                projectImage,

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


// GET MY PROJECTS
const getMyProjects = async (req, res) => {

    try {

        const projects =
            await Project.find({

                createdBy: req.user

            });

        res.json(projects);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// GET PROJECTS BY USER
const getProjectsByUser = async (req, res) => {

    try {

        const projects =
            await Project.find({

                createdBy: req.params.id

            });

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
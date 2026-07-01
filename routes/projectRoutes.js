const express = require("express");

const router = express.Router();

const {
    createProject,
    getMyProjects,
    getProjectsByUser
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

router.post(
    "/",
    protect,
    createProject
);

router.get(
    "/my-projects",
    protect,
    getMyProjects
);

router.get(
    "/user/:id",
    getProjectsByUser
);

module.exports = router;
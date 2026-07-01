const User = require("../models/User");

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getUserById = async (req, res) => {

    try {

        const user = await User.findById(
            req.params.id
        ).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.college = req.body.college || user.college;
        user.branch = req.body.branch || user.branch;
        user.year = req.body.year || user.year;
        user.githubUsername = req.body.githubUsername || user.githubUsername;
        user.skills = req.body.skills || user.skills;
        user.lookingFor = req.body.lookingFor || user.lookingFor;

        const updatedUser = await user.save();

        res.json(updatedUser);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    getAllUsers,
    getUserById,
    updateProfile
};

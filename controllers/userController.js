const User = require("../models/User");


// GET ALL USERS
const getAllUsers = async (req, res) => {

    try {

        const users = await User
            .find()
            .select("-password");

        res.json(users);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// GET SUGGESTED BUILDERS
const getSuggestedBuilders = async (req, res) => {

    try {

        const currentUser = await User.findById(
            req.user
        );

        if (!currentUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const users = await User
            .find({
                _id: { $ne: req.user }
            })
            .select("-password");

        const sortedUsers = users.sort((a, b) => {

            const aMatches =
                a.skills?.filter(
                    skill =>
                        currentUser.skills?.includes(skill)
                ).length || 0;

            const bMatches =
                b.skills?.filter(
                    skill =>
                        currentUser.skills?.includes(skill)
                ).length || 0;

            return bMatches - aMatches;

        });

        res.json(
            sortedUsers.slice(0, 4)
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET USER BY ID
const getUserById = async (req, res) => {

    try {

        const user = await User
            .findById(req.params.id)
            .select("-password");

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


// UPDATE PROFILE
const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(
            req.user
        );

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        user.profileImage =
            req.body.profileImage ||
            user.profileImage;

        user.bio =
            req.body.bio ||
            user.bio;

        user.college =
            req.body.college ||
            user.college;

        user.branch =
            req.body.branch ||
            user.branch;

        user.year =
            req.body.year ||
            user.year;

        user.githubUsername =
            req.body.githubUsername ||
            user.githubUsername;

        user.linkedinUsername =
            req.body.linkedinUsername ||
            user.linkedinUsername;

        user.skills =
            req.body.skills ||
            user.skills;

        user.lookingFor =
            req.body.lookingFor ||
            user.lookingFor;


        const updatedUser =
            await user.save();

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
    getSuggestedBuilders,
    getUserById,
    updateProfile,

};
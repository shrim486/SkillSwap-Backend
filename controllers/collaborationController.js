const CollaborationRequest = require(
    "../models/CollaborationRequest"
);


// Send Request
const sendRequest = async (req, res) => {

    try {

        const {
            receiver,
            projectIdea,
            roleNeeded,
            message
        } = req.body;

        const request =
            await CollaborationRequest.create({

                sender: req.user,

                receiver,

                projectIdea,

                roleNeeded,

                message

            });

        res.status(201).json(request);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get Incoming Requests
const getMyRequests = async (req, res) => {

    try {

        const requests =
            await CollaborationRequest.find({

                receiver: req.user,
                status: "pending"

            })

            .populate(
                "sender",
                "name college skills"
            );

        res.json(requests);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getMyCollaborations = async (req, res) => {

    try {

        const collaborations =
            await CollaborationRequest.find({

                status: "accepted",

                $or: [

                    { sender: req.user },

                    { receiver: req.user }

                ]

            })

            .populate(
                "sender",
                "name"
            )

            .populate(
                "receiver",
                "name"
            );

        res.json(
            collaborations
        );

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getMyChats = async (req, res) => {

    try {

        const collaborations =
            await CollaborationRequest.find({

                status: "accepted",

                $or: [

                    { sender: req.user },

                    { receiver: req.user }

                ]

            })

            .populate(
                "sender",
                "name"
            )

            .populate(
                "receiver",
                "name"
            );

        const chats = collaborations.map((collab) => {

            const otherUser =
                collab.sender._id.toString() === req.user

                    ? collab.receiver

                    : collab.sender;

            return {

                userId: otherUser._id,

                name: otherUser.name,

                projectIdea:
                    collab.projectIdea

            };

        });

        res.json(chats);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Accept Request
const acceptRequest = async (req, res) => {

    try {

        const request =
            await CollaborationRequest.findById(
                req.params.id
            );

        if (!request) {

            return res.status(404).json({
                message: "Request not found"
            });

        }

        request.status = "accepted";

        await request.save();

        res.json({
            message:
                "Collaboration accepted 🚀"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Reject Request
const rejectRequest = async (req, res) => {

    try {

        const request =
            await CollaborationRequest.findById(
                req.params.id
            );

        if (!request) {

            return res.status(404).json({
                message: "Request not found"
            });

        }

        request.status = "rejected";

        await request.save();

        res.json({
            message:
                "Request rejected"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {

    sendRequest,

    getMyRequests,

    getMyCollaborations,

    getMyChats,

    acceptRequest,

    rejectRequest

};
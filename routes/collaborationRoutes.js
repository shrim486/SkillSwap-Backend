const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    sendRequest,
    getMyRequests,
    getMyCollaborations,
    getMyChats,
    acceptRequest,
    rejectRequest
} = require("../controllers/collaborationController");


// Send Collaboration Request
router.post(
    "/send",
    protect,
    sendRequest
);


// Get Pending Requests
router.get(
    "/my-requests",
    protect,
    getMyRequests
);


// Get Active Collaborations
router.get(
    "/my-collaborations",
    protect,
    getMyCollaborations
);


// Get My Chats
router.get(
    "/my-chats",
    protect,
    getMyChats
);


// Accept Request
router.put(
    "/accept/:id",
    protect,
    acceptRequest
);


// Reject Request
router.put(
    "/reject/:id",
    protect,
    rejectRequest
);


module.exports = router;
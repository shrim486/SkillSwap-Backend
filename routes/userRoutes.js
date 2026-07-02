const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getSuggestedBuilders,
    getUserById,
    updateProfile
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
router.get("/", getAllUsers);
router.get("/suggested-builders", protect, getSuggestedBuilders);
router.get("/:id", getUserById);
router.put("/update-profile", protect, updateProfile);

module.exports = router;
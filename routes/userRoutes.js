const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getUserById,
    updateProfile
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
router.get("/", getAllUsers);

router.get("/:id", getUserById);
router.put("/update-profile", protect, updateProfile);

module.exports = router;
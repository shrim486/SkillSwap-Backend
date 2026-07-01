console.log("SESSION ROUTES LOADED!");

const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createSession,
  getMySessions,
  getTeacherSessions,
  acceptSession,
  rejectSession
} = require("../controllers/sessionController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("SESSION ROUTES WORKING");
});

router.get("/my", protect, getMySessions);
router.get("/teacher", protect, getTeacherSessions);
router.post("/", protect, createSession);
router.put("/:id/accept", protect, acceptSession);
router.put("/:id/reject", protect, rejectSession);

module.exports = router;
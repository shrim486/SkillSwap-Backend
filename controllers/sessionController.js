const Session = require("../models/Session");

const createSession = async (req, res) => {
  try {
    const session = await Session.create({
      teacher: req.body.teacher,
      student: req.user,
      skill: req.body.skill,
      date: req.body.date,
      time: req.body.time,
    });

    res.status(201).json(session);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getMySessions = async (req, res) => {
  try {

    const sessions = await Session.find({
      student: req.user
    }).populate(
      "teacher",
      "name email"
    );

    res.json(sessions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};
const getTeacherSessions = async (req, res) => {
  try {

    const sessions = await Session.find({
      teacher: req.user
    }).populate(
      "student",
      "name email"
    );

    res.json(sessions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};
const acceptSession = async (req, res) => {
  try {

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    session.status = "Accepted";

    await session.save();

    res.json(session);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};
const rejectSession = async (req, res) => {
  try {

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    session.status = "Rejected";

    await session.save();

    res.json(session);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};
module.exports = {
  createSession,
  getMySessions,
  getTeacherSessions,
  acceptSession,
  rejectSession,
};
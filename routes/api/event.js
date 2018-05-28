const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("../../validation/is-empty");

const passport = require("passport");
// const validateRegistration = require("../../validation/registration");

// const passport = require("passport");
// const app = express();

//db imports
const Group = require("../../models/Group");
const Event = require("../../models/Event");

//@route    POST api/event
//@desc     Creates event for group members to sign up for
//@access   Public
router.get("/test", (req, res) => {
  res.json({ success: "test route success" });
});

module.exports = router;

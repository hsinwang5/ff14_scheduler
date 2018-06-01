const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("../../validation/is-empty");
const validateMemberRegistration = require("../../validation/eventRegistration");
const moment = require("moment");

const passport = require("passport");
// const validateRegistration = require("../../validation/registration");

// const passport = require("passport");
// const app = express();

//db imports
const Group = require("../../models/Group");
const Event = require("../../models/Event");
const Member = require("../../models/Member");
const Weekly = require("../../models/Weekly");
const Datedata = require("../../models/Datedata");
const Signup = require("../../models/Signup");

//@route    POST api/event
//@desc     test route
//@access   Public
router.get("/test", (req, res) => {
  res.json({ success: "test route success" });
});

//@route    POST api/event/create
//@desc     Creates event for group members to sign up for
//@access   Private
//@params   name, symbol, groupid, isWeekly, weeks, dates, isWeekly
router.post("/create", (req, res) => {
  const { errors, isValid } = validateMemberRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // const date = moment(req.body.date, "MMM-DD-YYYY");

  const newEvent = new Event({
    name: req.body.name,
    symbol: req.body.symbol,
    isWeekly: req.body.isWeekly
  });

  newEvent.save().then(savedEvent => {
    //push repeatable weekly events into weekly array if isWeekly is true
    //otherwise, push specific dates into dates array in Event model
    if (req.body.isWeekly) {
      //req.body.weeks is an array of ["Monday", "Wednesday", "Friday", etc]
      req.body.weeks.map((week, index) => {
        const newWeekly = new Weekly({
          week: week
        });
        newWeekly
          .save()
          .then(savedWeekly => {
            savedEvent.weekly.push(savedWeekly._id);
            if (index === req.body.weeks.length - 1) {
              savedEvent.save();
            }
          })
          .catch(err => res.json(err));
      });
    } else {
      //req.body.dates is array of ["January 4th, 1995", June 3rd, 1998", etc]
      req.body.dates.map((date, index) => {
        const convertedDate = moment(date, "MMM-DD-YYYY");
        const newDatedata = new Datedata({
          dateinfo: convertedDate
        });
        newDatedata
          .save()
          .then(savedDatedata => {
            savedEvent.datedata.push(savedDatedata._id);
            if (index === req.body.dates.length - 1) {
              savedEvent.save();
            }
          })
          .catch(err => res.status(400).json(err));
      });
      savedEvent.save();
    }

    //find group
    Group.findOne({ _id: req.body.groupid })
      .then(group => {
        console.log("group function");
        group.events.push(savedEvent);
        group.save().then(savedGroup => res.json(savedEvent));
      })
      .catch(err => res.status(400).json(err));
  });
});

//@route    POST api/event/signup
//@desc     signs a player up to the specified time
//@access   Private

//react will have objectid's for datedata or weekly. Look up by id
//then update with data
router.post("/signup", (req, res) => {
  const errors = {
    error: "Could not update signup. Please reload and try again"
  };

  if (req.body.isWeekly) {
    Weekly.findById(req.body.weeklyid)
      .then(weekly => {
        //create new signup data
        const newSignup = new Signup({
          member: req.body.memberid,
          availability: req.body.availability
        });
        newSignup.save().then(savedSignup => res.json(savedSignup));
      })
      .catch(err => res.status(400).json(error));
  } else {
    Datedata.findById(req.body.datedataid)
      .then(dateData => {
        //create new signup data
        const newSignup = new Signup({
          member: req.body.memberid,
          availability: req.body.availability
        });
        newSignup.save().then(savedSignup => {
          dateData.signups.push(savedSignup._id);
          dateData.save().then(saveddateData => res.json(savedSignup));
        });
      })
      .catch(err => res.status(400).json(err));
  }
});

module.exports = router;

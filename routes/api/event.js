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
    isWeekly: req.body.isWeekly,
    description: req.body.description
  });

  newEvent.save().then(savedEvent => {
    //push repeatable weekly events into weekly array if isWeekly is true
    //otherwise, push specific dates into dates array in Event model
    // if (req.body.isWeekly) {
    //req.body.daysOrWeeks is an array of ["Monday", "Wednesday", "Friday", etc]
    req.body.daysOrWeeks.map((week, index) => {
      const newWeekly = new Weekly({
        week: week
      });
      newWeekly
        .save()
        .then(savedWeekly => {
          savedEvent.weekly.push(savedWeekly._id);
          console.log("pushed");
          if (index === req.body.daysOrWeeks.length - 1) {
            savedEvent.save();
          }
        })
        .catch(err => res.json(err));
    });
    // } else {
    //req.body.dates is array of ["January 4th, 1995", June 3rd, 1998", etc]
    // req.body.daysOrWeeks.map((date, index) => {
    //   const convertedDate = moment(date, "MMM-DD-YYYY");
    //   const newDatedata = new Datedata({
    //     dateinfo: convertedDate
    //   });
    //   newDatedata
    //     .save()
    //     .then(savedDatedata => {
    //       savedEvent.datedata.push(savedDatedata._id);
    //       if (index === req.body.daysOrWeeks.length - 1) {
    //         savedEvent.save();
    //       }
    //     })
    //     .catch(err => res.status(400).json(err));
    // });
    // savedEvent.save();
    // }

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

//@route    POST api/event/update
//@desc     updates event for group members to sign up for
//@access   Private
//@params   name, symbol, eventid, isWeekly, weeks, dates, isWeekly
router.post("/update", (req, res) => {
  const updatedEvent = {};
  if (req.body.name && req.body.name !== "") updatedEvent.name = req.body.name;
  if (req.body.description && req.body.description !== "")
    updatedEvent.description = req.body.description;
  if (req.body.eventSize && req.body.eventSize !== 0)
    updatedEvent.eventSize = req.body.eventSize;
  if (req.body.symbol) updatedEvent.symbol = req.body.symbol;
  if (req.body.starttime && req.body.starttime !== "")
    updatedEvent.starttime = req.body.finaltime;
  if (req.body.endtime && req.body.endtime !== "")
    updatedEvent.endtime = req.body.finaltime;
  Event.findOneAndUpdate(
    { _id: req.body.eventid },
    { $set: updatedEvent },
    { new: true }
  )
    .then(updatedEvent => res.json(updatedEvent))
    .catch(err => res.json(err));
});

//@route    POST api/event/signup
//@desc     signs a player up to the specified time or updates time
//@access   Private

//json request will have objectid's for datedata or weekly. Look up by id
//then update with data
router.post("/signup", (req, res) => {
  const errors = {
    error: "Could not update signup. Please reload and try again"
  };

  const newSignup = {
    member: req.body.memberid,
    availability: req.body.availability
  };

  //if isWeekly is set, performs operations on Weekly data
  //otherwise, performs operations on Datedata data
  //Updates signup if one exists, otherwise creates a new one and pushes to
  //the associated event signup
  //**TODO: refactor needed
  if (req.body.isWeekly) {
    //if signupid is sent, update instead of create
    if (req.body.signupid) {
      Signup.findOneAndUpdate(
        { _id: req.body.signupid },
        { $set: newSignup },
        { new: true }
      ).then(updatedSignup => res.json(updatedSignup));
    } else {
      //if signupid is not sent, create new signup and push into weekly schedule
      Weekly.findById(req.body.weeklyid)
        .then(weekly => {
          new Signup(newSignup).save().then(savedSignup => {
            weekly.signups.push(savedSignup._id);
            weekly.save().then(savedweekly => res.json(savedSignup));
          });
        })
        .catch(err => res.status(400).json(error));
    }
  } else {
    //this else route runs if isWeekly is false (thus not a weekly event)
    if (req.body.signupid) {
      //if signupid is sent, update instead of create
      Signup.findOneAndUpdate(
        { _id: req.body.signupid },
        { $set: newSignup },
        { new: true }
      )
        .then(savedSignup => res.json(savedSignup))
        .catch(err => res.json(err));
    } else {
      Datedata.findById(req.body.datedataid)
        .then(dateData => {
          new Signup(newSignup).save().then(savedSignup => {
            dateData.signups.push(savedSignup._id);
            dateData.save().then(saveddateData => res.json(savedSignup));
          });
        })
        .catch(err => res.status(400).json(err));
    }
  }
});

//@route    GET api/event
//@desc     retrieves event information for specified groupid
//@access   Public
router.get("/:eventid", (req, res) => {
  Event.findById(req.params.eventid)
    .populate({
      path: "weekly",
      populate: { path: "signups", populate: { path: "member" } }
    })
    .populate({
      path: "datedata",
      populate: { path: "signups", populate: { path: "member" } }
    })
    .then(foundEvent => res.json(foundEvent))
    .catch(err => res.json({ error: "no event found. Reload and try again" }));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("../../validation/is-empty");

const passport = require("passport");
const validateMemberRegistration = require("../../validation/memberRegistration");

// const app = express();
const keys = require("../../config/keys");

//db imports
const Member = require("../../models/Member");
const Group = require("../../models/Group");

router.get("/test", (req, res) => {
  res.json({ works: "member route works" });
});

//@route    GET api/member/register
//@desc     register member to group
//@acces    Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateMemberRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Member.findById(req.body.memberid).then(member => {
    if (member) {
      errors.username = "That username is already registered as a member";
      return res.status(400).json(errors);
    } else {
      //Set passwordenabled flag. If user has no password, default is 'password'
      if (req.body.password) {
        passwordenabled = true;
        password = req.body.password;
      } else {
        passwordenabled = false;
        password = "password";
      }
      const newMember = new Member({
        username: req.body.username,
        passwordenabled: passwordenabled,
        password: password,
        email: req.body.email,
        editEvents: req.body.editEvents,
        editLoot: req.body.editLoot,
        editGuides: req.body.editGuides,
        mainclass: req.body.mainclass,
        altclass: req.body.altclass
      });

      bcrypt.hash(newMember.password, 10, function(err, hash) {
        if (err) throw err;
        newMember.password = hash;
        newMember
          .save()
          .then(savedMember => {
            Group.findOne({ _id: req.body.groupid }).then(group => {
              group.members.push(savedMember);
              group.save().then(savedgroup => res.json(savedMember));
            });
          })
          .catch(err => console.log(err));
      });
    }
  });
});

//@route    GET api/member/login
//@desc     logs in group member
//@acces    Public
router.post("/login", passport.authenticate("local"), (req, res) => {
  Member.findById(req.body.memberid)
    .then(member => {
      res.json(member);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;

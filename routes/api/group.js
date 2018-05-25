const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isEmpty = require("../../validation/is-empty");

const passport = require("passport");
const validateRegistration = require("../../validation/registration");
const validateGroupLogin = require("../../validation/group-login");

// const passport = require("passport");
const app = express();
const keys = require("../../config/keys");

//db imports
const Group = require("../../models/Group");

//@route    GET api/group/test
//@desc     Tests group route
//@access   Public
router.post("/test", (req, res) => {
  res.json(req.body);
});

//@route    GET api/group/:id
//@desc     retrieves raid group info from database
//@access   Public
router.get("/:id", (req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({ nogroupfound: "No group with that id found" })
    );
});

//@route    POST api/group/register
//@desc     registers raid group and provides private link based on ID
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Group.findOne({ email: req.body.email }).then(group => {
    if (group && group.email !== "") {
      errors.email = "That email is already in use";
      return res.status(400).json(errors);
    } else {
      let passwordenabled, password;
      if (req.body.password) {
        passwordenabled = true;
        password = req.body.password;
      } else {
        passwordenabled = false;
        password = "";
      }
      const newGroup = new Group({
        groupname: req.body.groupname,
        email: req.body.email,
        passwordenabled: passwordenabled,
        password: password
      });

      if (passwordenabled) {
        bcrypt.hash(newGroup.password, 10, function(err, hash) {
          if (err) throw err;
          newGroup.password = hash;
          newGroup
            .save()
            .then(group => res.json(group))
            .catch(err => console.log(err));
        });
      } else {
        newGroup
          .save()
          .then(group => res.json(group))
          .catch(err => console.log(err));
      }
    }
  });
});

//@route    POST api/group/login
//@desc     logs group admin in and allows admin status for group page
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateGroupLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  Group.findOne({ email }).then(group => {
    if (!group) {
      errors.email = "There is no group with that email associated with it.";
      return res.status(404).json(errors);
    }
    if (group.id !== req.body.id) {
      errors.id = "An admin password has not been set for this account.";
      return res.status(404).json(errors);
    }
    //compare passwords
    bcrypt.compare(password, group.password).then(isMatch => {
      if (isMatch) {
        const JWTpayload = {
          id: group.id,
          groupname: group.groupname
        };
        //sign token
        jwt.sign(
          JWTpayload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;

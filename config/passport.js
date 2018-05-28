const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Group = mongoose.model("group");
const Member = require("../models/Member");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  //JWT strategy config (for admin access)
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Group.findById(jwt_payload.id)
        .then(group => {
          if (group) {
            return done(null, group);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  // local strategy config (for member access)
  passport.use(
    new LocalStrategy(function(username, password, done) {
      Member.findOne({ username: username }, function(err, member) {
        if (password === null || password === undefined) {
          return done(null, member);
        }
        if (err) {
          return done(err);
        }
        if (!member) {
          return done(null, false);
        }
        bcrypt
          .compare(password, member.password)
          .then(res => {
            if (res) {
              return done(null, member);
            } else {
              return done(null, false);
            }
          })
          .catch(err => {
            return done(null, false);
          });
        // return done(null, member);
      });
    })
  );

  // passport.serializeUser(Member.serializeUser());

  // passport.deserializeUser(Member.deserializeUser());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
    Member.findOne({ username: user.username }, function(err, user) {
      done(err, user);
    });
  });
};

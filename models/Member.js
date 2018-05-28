const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordenabled: {
    type: Boolean,
    default: false
  },
  email: {
    type: String
  },
  editEvents: {
    type: Boolean,
    default: false
  },
  editLoot: {
    type: Boolean,
    default: false
  },
  editGuides: {
    type: Boolean,
    default: false
  },
  mainclass: {
    type: String,
    required: true
  },
  altclasses: {
    type: String
  }
});

module.exports = Member = mongoose.model("member", MemberSchema);

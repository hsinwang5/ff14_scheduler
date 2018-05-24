const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  main: {
    type: String
  },
  alts: {
    type: String
  }
});

module.exports = Member = mongoose.model("member", MemberSchema);

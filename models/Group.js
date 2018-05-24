const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: false
  },
  email: {
    type: String
  },
  passwordenabled: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  members: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: "member"
      }
    }
  ],
  events: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: "event"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model("group", UserSchema);
//test

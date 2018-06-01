const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklySchema = new Schema({
  week: {
    type: String,
    required: true
  },
  signups: [
    {
      type: Schema.Types.ObjectId,
      ref: "signup"
    }
  ],
  confirmed: {
    type: Boolean,
    default: false
  },
  starttime: {
    type: Number
  },
  endtime: {
    type: Number
  }
});

module.exports = Weekly = mongoose.model("weekly", WeeklySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatedataSchema = new Schema({
  dateinfo: {
    type: Date,
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

module.exports = Datedata = mongoose.model("datedata", DatedataSchema);

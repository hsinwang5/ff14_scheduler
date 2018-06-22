const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "A description has not been provided for this event."
  },
  eventSize: {
    type: Number,
    default: 8
  },
  isWeekly: {
    type: Boolean,
    required: true
  },
  datedata: [
    {
      type: Schema.Types.ObjectId,
      ref: "datedata"
    }
  ],
  weekly: [
    {
      type: Schema.Types.ObjectId,
      ref: "weekly"
    }
  ],
  symbol: {
    type: Number,
    default: 0
  },
  starttime: {
    type: Number,
    default: 0
  },
  endtime: {
    type: Number,
    default: 0
  }
});

module.exports = Event = mongoose.model("event", EventSchema);

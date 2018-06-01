const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
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
  finaltime: {
    type: Number,
    default: 0
  }
});

module.exports = Event = mongoose.model("event", EventSchema);

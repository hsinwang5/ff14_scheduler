const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  maxsignups: {
    type: Number,
    default: 100
  },
  signups: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: "member"
      },
      availability: {
        type: Array,
        required: true
      },
      class: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Event = mongoose.model("event", EventSchema);

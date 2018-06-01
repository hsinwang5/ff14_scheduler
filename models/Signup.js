const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignupSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: "member"
  },
  availability: {
    type: Array
  },
  mainclass: {
    type: String
  },
  altclass: {
    type: String
  }
});

module.exports = Signup = mongoose.model("signup", SignupSchema);

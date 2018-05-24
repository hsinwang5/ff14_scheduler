const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const passport = require("passport");

const group = require("./routes/api/group");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("db successfully connected!"))
  .catch(err => console.log(err));

// app.use(passport.initialize());

//Routes
app.use("/api/group", group);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

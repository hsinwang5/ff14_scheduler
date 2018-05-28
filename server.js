const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

const group = require("./routes/api/group");
const event = require("./routes/api/event");
const member = require("./routes/api/member");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("db successfully connected!"))
  .catch(err => console.log(err));

//passport configurations
app.use(
  require("express-session")({
    secret: keys.localKey,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Routes
app.use("/api/group", group);
app.use("/api/event", event);
app.use("/api/member", member);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

console.clear();
/*
  Create a new express app
*/
const shrinkRay = require("shrink-ray-current");
const express = require("express");
const app = express();

// compress all requests
app.use(shrinkRay());

/*
  Setup Mongoose (using environment variables)
*/
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.error(`Error in mongoose connection: ${err}`));

mongoose.set("useFindAndModify", false); // To fix this error: https://mongoosejs.com/docs/deprecations.html#findandmodify

/*
  Setup and configure Passport
*/
const session = require("express-session");
app.use(
  session({
    secret: "any salty secret here",
    resave: true,
    saveUninitialized: false,
  })
);

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
const User = require("./models/User");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
  Setup the body parser
*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
  Register our route composer
*/
const routes = require("./routes.js");
app.use("/api", routes);

const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

/*
  Start the server
*/
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

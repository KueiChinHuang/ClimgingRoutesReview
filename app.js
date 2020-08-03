console.clear();
/*
  Create a new express app
*/
const express = require('express');
const app = express();

/*
  Setup Mongoose (using environment variables)
*/
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(err => console.error(`Error in mongoose connection: ${err}`));

mongoose.set('useFindAndModify', false); // To fix this error: https://mongoosejs.com/docs/deprecations.html#findandmodify

/*
  Setup and configure Passport
*/
const session = require('express-session');
app.use(session({
  secret: 'any salty secret here',
  resave: true,
  saveUninitialized: false  
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/User');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/*
  Setup the asset pipeline, path, the static paths,
  the views directory, and the view engine
*/
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static('assets/css'));
app.use('/images', express.static('assets/images'));
app.use('/javascript', express.static('assets/javascript'));
/*
  Setup the body parser
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
  Register our route composer
*/
const routes = require('./routes.js');
app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

/*
  Start the server
*/
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
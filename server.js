const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session')
require('dotenv').config();

// Configuration
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT));

//Controllers
const userController = require('./controllers/controller_users.js');
const sessionsController = require('./controllers/controller_sessions.js');

// Global Middleware
// allows us to use put and delete methods
app.use(methodOverride('_method'));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
//This must go before contollers
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//Redirection to controllers
app.use('/users', userController);
app.use('/sessions', sessionsController);

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
});

app.get('/app', (req, res, next)=>{
  if(!req.session.currentUser){
    console.log("that's not a user!");
    res.redirect('/sessions/new');
  } else {
    next();
  }
});
app.get('/app', (req, res)=>{
  res.render('app/index.ejs')
});

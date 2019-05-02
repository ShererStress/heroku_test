const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');
const User = require(`../models/users.js`);

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

sessions.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if(foundUser) {
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.currentUser = foundUser;
            res.redirect('/'); // Back to the index
        } else {
          res.send('<a href="/">wrong password/username</a>');
        }
      } else {
        res.send('<a href="/">wrong password/username</a>');
      }

    });
});

sessions.delete(`/`, function(req,res) {
  req.session.destroy(function() {
    res.redirect(`/`); //Index
  });
});


module.exports = sessions;

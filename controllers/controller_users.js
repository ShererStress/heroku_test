const express = require('express');
const user = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

user.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

user.post(`/`, function(req,res) {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, newUser) {
    res.redirect(`/`); //back to the index
  });
});



module.exports = user;

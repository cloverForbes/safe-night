const bodyParser = require('body-parser');
const User       = require('../models/user');

module.exports = {
  showHome: (req, res) => {
    res.render('pages/home');
  },

  showAbout: (req, res) => {
    res.render('pages/about');
  },

  showContact: (req, res) => {
    res.render('pages/contact');
  },

  showLogin: (req, res) => {
    res.render('pages/login');
  },

  verifyLogin: (req, res) => {
    User.findOne({ 'email': req.body.email}, (err, user) => {
      if(err){res.send(err)};
      if(user == null){res.send('User was not found')};
      if(user.password == req.body.password){
        console.log(user.email + ' has logged in');
        res.redirect('/user/' + user._id);
      }
      else {
        res.send('Password was wrong')
      }
    });
  },

  createUser: (req, res) => {
    console.log(req.body);
    res.render('pages/login');
  }
}

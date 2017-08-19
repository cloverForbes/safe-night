const bodyParser = require('body-parser');
const User       = require('../models/user');

module.exports = {
  showHome: (req, res) => {
    //console.log(res);
    console.log(res.socket.parser.incoming.originalUrl);
    res.render('pages/index', {err: [], page: res.socket.parser.incoming.originalUrl})
  },

  showAbout: (req, res) => {
    console.log(res.socket.parser.incoming.originalUrl);
    res.render('pages/about',{page: res.socket.parser.incoming.originalUrl});
  },

  showContact: (req, res) => {
    console.log(res.socket.parser.incoming.originalUrl);
    res.render('pages/contact');
  },

  showLogin: (req, res) => {
    res.render('pages/login');
  },

  verifyLogin: (req, res) => {
    User.findOne({ 'email': req.body.email}, (err, user) => {
      if(err){res.send(err)}
      if(user === null){res.send('User was not found')};
      if(user.password === req.body.password){
        console.log(user.email + ' has logged in');
        res.redirect('/user/' + user._id);
      }
      else {
        res.send('Password was wrong')
      }
    });
  },

  createUser: (req, res) => {
      var newUser = new User(req.body);
      newUser.save((err, user) => {
          if(err){res.render('pages/index', {err: err, page: res.socket.parser.incoming.originalUrl })}
          console.log(newUser.firstName + ' Created');
          res.render('pages/thank')
      });

  }
};

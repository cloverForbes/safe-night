 const User = require('../models/user');

module.exports = {

  getAllUsers: (req, res) => {
    //validate(req.headers.api_key);
    User.find({}, (err, user) => {
      if(err) {res.send(err)}
      res.status(200).json(user);
    });
  },

  createUser: (req, res) => {
  var newUser = new User(req.body);
    newUser.save((err, user) => {
      if(err){res.send(err)}
      console.log(newUser.firstName + ' Created');
      res.json(user);
    });
  },

  readUser: (req, res) => {
    //validate(req.headers.api_key);
    User.findOne({_id: req.params.id}, (err, user) => {
      if(err){res.send(err)}
      res.json(user)
    });
  },

  updateUser: (req, res) => {
   // validate(req.headers.api_key);
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, user) => {
      if(err){res.send(err)}
      res.json(user);
    });
  },

  removeUser: (req, res) => {
    //validate(req.headers.api_key);
    User.remove({_id: req.params.id}, (err, user) => {
      if(err){res.send(err)}
      res.json("User was succesfully deleted");
    });
  }
}

/*function validate(key) {
  if (key !== "key") {
    res.status(415).send("Invalid API");
  }
  else {
    console.log("Valid API key ");
  }
} */

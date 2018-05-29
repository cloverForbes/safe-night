const User = require('../models/user');

module.exports = {

  getAllUsers: (req, res) => {
    User.find({}, (err, user) => {
      if(err) {res.send(err)}
      res.status(200).json(user);
    });
  },

  createUser: (req, res) => {
  let newUser = new User(req.body);
    newUser.save((err, user) => {
      if(err){res.send(err)}
      console.log(newUser.firstName + ' Created');
      res.json(user);
    });
  },

  readUser: (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
      if(err){res.send(err)}
      res.json(user)
    });
  },

  updateUser: (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, user) => {
      if(err){res.send(err)}
      res.json(user);
    });
  },

  removeUser: (req, res) => {
    User.remove({_id: req.params.id}, (err, user) => {
      if(err){res.send(err)}
      res.json(`${user.firstName} ${user.lastName} was successfully deleted`);
    });
  },

    verifyLogin: (req, res) => {
        if (!req.body.password) {
            res.send("ERROR");
        }
        else {
            User.findOne({'email': req.body.email}, (err, user) => {
                if (err) {
                    res.send(err)
                }
                if (user === null) {
                    res.send('User was not found')
                }
                if (user.password === req.body.password) {
                    console.log(user.email + ' has logged in');
                    res.send(user);
                }
                else {
                    res.send('Password was wrong')
                }
            });
        }
    },
};

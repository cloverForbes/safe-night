const User = require('../models/user');

module.exports = {

    getUsersByCity : (req, res) => {
        User.find({city : req.params.city }, (err, user) => {
            if(err){res.status(404),send(err)}
            res.status(200).json(user);
        });
    },

    updateArr : (req, res) => {
        User.findOneAndUpdate({_id : req.params.id}, {$push: {alerts: 'blah'}}, {safe: true, upsert: true, new: true}, function (err, model) {
           if(err){console.log(err)}
           console.log(model);
           res.send(model);
        });
    },

    isHomeless : (req, res) => {
        let userInfo = '';
        let providers = [];
        User.find({_id : req.params.id}, (err, user) => {
           if(err){console.log(err)}
           userInfo = user[0];
        }).then( () => {
            User.find({type : 'provider', city: userInfo.city }, (err, user) => {
                if(err){console.log(err)}
                providers = user;
            }).then( () => {
                for(p in providers){
                    User.findOneAndUpdate({_id : providers[p].id},{$push: {alerts: userInfo}}, {safe: true, new: true }, (err, model) => {
                       if(err) {console.log(err)}
                       console.log(model);
                    })
                }

            }).then(() => {
                res.send('done');
            })
        })
    }



};

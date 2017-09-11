const User = require('../models/user');

module.exports = {

    getUsersByCity : (req, res) => {
        User.find({city : req.params.city }, (err, user) => {
            if(err){res.status(404),send(err)}
            res.status(200).json(user);
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
                    })
                }

            }).then(() => {
                User.findOneAndUpdate({_id : req.params.id}, {$set:  {isHomeless: true}}, {new: true, upsert: true}, (err, hs) =>{
                    if(err) {console.log(err); res.send(err)}
                    console.log(hs);
                })
            }).then(() => {
                console.log(userInfo.firstName + ' is homeless.');
                res.send('done');
            })
        })
    },

    providerDecision : (req, res) => {
        let days = Number(req.params.days);
        let provider = req.params.id;
        let seeker = req.params.seeker;
        let mail = '';

        if(days === 0){
           User.find({_id : seeker}, (err,user) => {
               console.log(provider);
               if (err){res.send(err)}
               mail = user[0].email;
           }).then(() => {
               User.findOneAndUpdate({_id : provider},{$pull: {alerts: {email: mail}}}, {new: true, upsert: true}, (err, user) => {
                   if (err){res.send(err)}
                   res.send(user);
               })
           })
        }

        else{
            User.find({_id : seeker}, (err,user) => {
                console.log(provider);
                if (err){res.send(err)}
                mail = user[0].email;
            }).then(() => {
                User.findOneAndUpdate({_id : provider},{$pull: {alerts: {email: mail}}}, {new: true, upsert: true}, (err) => {
                    if (err){res.send(err)}
                })
            }).then(() => {
                User.findOneAndUpdate({_id : seeker}, {$push: {alerts: [provider, days] }}, {new: true, upsert: true}, (err, user) => {
                  if (err){res.send(err)}
                  res.send('done');
                })
            })
        }

    },

    getProfile : (req, res) => {
        User.findOne({_id : req.params.id}, (err, user) => {
            if(err){res.send(err)}
            res.render('pages/profile', {user: user, page: res.socket.parser.incoming.originalUrl})
        })
    }

};




const User = require('../models/user');

module.exports = {
    getAdmin : (req, res) => {
        res.render('pages/admin', {page: res.socket.parser.incoming.originalUrl});
    },

    getCityAdmin : (req, res) => {
        User.find({city : req.params.city, isHomeless : true}, (err, user) => {
            if(err){res.send(err)}
            res.render('pages/city', {users: user, page: res.socket.parser.incoming.originalUrl});
        })
    }
};

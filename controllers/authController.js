userModel = require('../models/usersModel');
class auth {
    static strategy = (username, password, done) => {
        userModel.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            if (user.password != password) {
                return done(null, false, {
                    message: 'password not matched'
                });
            }
            return done(null, user);
        });
    }

    static serializeUser = (user, done) => {
        done(null, user.id);
    }

    static deserializeUser = (id, done) => {
        userModel.findById(id, function (err, user) {
            done(err, user);
        });
    }

    static authorize (){
        return  function (req, res, next){
            if(req.isAuthenticated())
            {
                var _send = res.send;
                var sent = false;
                res.send = function(data){
                    if(sent) return;
                    _send.bind(res)(data);
                    sent = true;
                };
                 next();
            }else{
                res.redirect('/login');
            }
        }
    }
}
module.exports = auth;
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

    static authorize = () => {
        return (req, res, next) => {
            if(req.user){
                next();
            }else{
                res.redirect('/login');
            }
        }
    }

    // static logout = () =>{
        
    //     return (req, res, next) => {
            
    //         req.user = null;
    //         if(req.user){
    //             console.log('Hasan');
    //             next();
    //         }
    //         else{
    //             console.log('Salam');
    //             res.redirect('/login');
    //         }
    //     }
    // }


    
}
module.exports = auth;
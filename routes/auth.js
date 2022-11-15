var express = require('express');
var router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get('/login', (req, res, next) => {
    if(req.user)
    {
        res.redirect('/admin');
    }
    else{
        res.render('login', {
            title: 'Learn with Hasan',
            message: req.flash('error')
        });
    }
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: "/login",
    failureFlash: true
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = router;
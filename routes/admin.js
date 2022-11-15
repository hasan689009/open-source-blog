var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.get('/', function (req, res, next) {
    res.render('admin/dashboard', {
        title : 'Dashboard | LWH'
    });
});

router.get('/users', userController.index);

module.exports = router;

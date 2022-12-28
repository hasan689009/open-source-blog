var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.get('/', function (req, res, next) {
    res.render('admin/dashboard', {
        title : 'Dashboard | LWH'
    });
});

router.get('/users', userController.index);
router.post('/users', userController.create);
router.get('/user/:id', userController.getById);
router.patch('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);
module.exports = router;

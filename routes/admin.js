var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var categoriesController = require('../controllers/categoriesController');

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

router.get('/categories', categoriesController.index);
router.post('/categories', categoriesController.store);
router.get('/category/:id', categoriesController.getById);
router.delete('/category/:id', categoriesController.delete);
router.patch('/category/:id', categoriesController.update);
module.exports = router;

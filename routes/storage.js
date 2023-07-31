const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storageController');
const authController = require('../controllers/auth');

router.get('/', authController.isLoggedIn, storageController.view);
router.post('/', storageController.find);
router.get('/additem', authController.isLoggedIn, storageController.form);
router.post('/additem', authController.isLoggedIn, storageController.create);
router.get('/edititem/:id', storageController.edit);
router.post('/edititem/:id', storageController.update);
router.get('/viewitem/:id', authController.isLoggedIn, storageController.viewdetail);
router.get('/:id', storageController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();

// Import your new controller
const indexController = require('../controllers/indexController');

// Map the routes to the controller functions
router.get('/', indexController.getHomePage);
router.get('/about', indexController.getAboutPage);
router.get('/contact-me', indexController.getContactPage);

module.exports = router;
const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Route to display the sendMessages page
router.get('/', usersController.getSendMessagesPage);

// Route to handle sending the message
router.post('/send-message', usersController.sendMessage);

// Route to fetch the average sugar level
router.get('/average-sugar-level/:userId', usersController.getAverageSugarLevel);

module.exports = router;

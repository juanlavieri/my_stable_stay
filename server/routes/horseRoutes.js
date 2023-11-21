const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, horseController.createHorse);
// Define other routes (GET, PUT, DELETE) similarly

module.exports = router;

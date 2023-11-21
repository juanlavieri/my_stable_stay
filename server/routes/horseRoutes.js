const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, horseController.createHorse);
router.put('/:horseId', authMiddleware, horseController.updateHorse);
router.delete('/:horseId', authMiddleware, horseController.deleteHorse);
// Define other routes (GET, PUT, DELETE) similarly

module.exports = router;

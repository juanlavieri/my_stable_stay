const express = require('express');
const router = express.Router();
const stallController = require('../controllers/stallController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, stallController.createStall);
router.get('/:stallId', stallController.getStall);
router.put('/:stallId', authMiddleware, stallController.updateStall);
router.delete('/:stallId', authMiddleware, stallController.deleteStall);

module.exports = router;

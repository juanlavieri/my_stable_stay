const express = require('express');
const router = express.Router();
const stableController = require('../controllers/stableController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, stableController.createStable);
router.get('/:stableId', stableController.getStable);
router.put('/:stableId', authMiddleware, stableController.updateStable);
router.delete('/:stableId', authMiddleware, stableController.deleteStable);

module.exports = router;

const express = require('express');
const router = express.Router();
const stableController = require('../controllers/stableController');

// Routes for stables
router.post('/', stableController.createStable);
router.get('/', stableController.getAllStables);
router.get('/:id', stableController.getStableById);
router.put('/:id', stableController.updateStable);
router.delete('/:id', stableController.deleteStable);

module.exports = router;

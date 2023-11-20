const express = require('express');
const router = express.Router();
const stableController = require('../controllers/stableController');

router.post('/', stableController.createStable);

// ...other routes...

module.exports = router;

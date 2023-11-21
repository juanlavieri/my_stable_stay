const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Adjust based on your storage solution

router.post('/', authMiddleware, horseController.createHorse);

// Combined PUT route for updating horse data and handling file upload
router.put('/:horseId', authMiddleware, upload.single('medicalDocument'), horseController.updateHorse);

router.delete('/:horseId', authMiddleware, horseController.deleteHorse);

module.exports = router;
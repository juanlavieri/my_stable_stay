const express = require('express');
const router = express.Router();
const horseController = require('../controllers/horseController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Adjust based on your storage solution

router.post('/', authMiddleware, horseController.createHorse);
router.put('/:horseId', authMiddleware, horseController.updateHorse);
router.delete('/:horseId', authMiddleware, horseController.deleteHorse);
// Add a route for updating horse with file upload
router.put('/:horseId', authMiddleware, upload.single('medicalDocument'), horseController.updateHorse);

// Define other routes (GET, PUT, DELETE) similarly

module.exports = router;

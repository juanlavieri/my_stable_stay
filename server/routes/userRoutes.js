const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile); // Apply authMiddleware
router.put('/profile', authMiddleware, userController.updateProfile);
// router.post('/switch-role', authMiddleware, userController.switchUserRole);


module.exports = router;

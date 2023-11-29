const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you use authentication

// Create a new booking
router.post('/', authMiddleware, bookingController.createBooking);

// Get all bookings for the logged-in user
router.get('/', authMiddleware, bookingController.getUserBookings);

// Update an existing booking
router.put('/:bookingId', authMiddleware, bookingController.updateBooking);

// Delete a booking
router.delete('/:bookingId', authMiddleware, bookingController.deleteBooking);

// Get all bookings for a specific stable
router.get('/stable/:stableId', authMiddleware, bookingController.getStableBookings);

module.exports = router;

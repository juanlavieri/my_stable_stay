const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { stable, startDate, endDate } = req.body;
    const userId = req.user.id; // Extract user ID from the auth middleware

    const newBooking = new Booking({
      user: userId,
      stable,
      startDate,
      endDate
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getUserBookings = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have the user's ID from the auth middleware
  
      // Find all bookings where the 'user' field matches the logged-in user's ID
      const bookings = await Booking.find({ user: userId }).populate('stable');
      // The .populate('stable') is optional, use it if you want to include details of the stable in the response
  
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

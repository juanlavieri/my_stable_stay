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

exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const { startDate, endDate, stable } = req.body;

    // Check if the new dates overlap with any existing bookings for the same stable
    const conflictingBookings = await Booking.find({
      _id: { $ne: bookingId }, // Exclude the current booking
      stable,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }, // New dates overlap existing booking
      ]
    });

    if (conflictingBookings.length > 0) {
      return res.status(400).json({ message: 'Selected dates are not available' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { startDate, endDate },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getStableBookings = async (req, res) => {
  try {
    const stableId = req.params.stableId;

    const bookings = await Booking.find({ stable: stableId }).populate('user');

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};



const User = require('../models/UserSchema')
const Doctor = require('../models/DoctorSchema');
// bookingController.js

const Booking = require('../models/BookingSchema');

// Create a new booking
const createBooking = async (req,res) => {
  console.log("inside createBooking");
  try {
    const { appointmentDate } = req.body;
    console.log(req.body);
    // Create a new booking instance
    const booking = new Booking({
      doctor: req.params.id,
      user: req.payload,

      appointmentDate
    });

    console.log(booking);
    

    // Save the booking to the database
    const savedBooking = await booking.save();
    

    res.status(201).json(savedBooking); // Return the saved booking

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
const getBookingsByUserId = async (req, res) => {
    try {
        const userId = req.payload; // Extract user ID from request parameters
        const bookings = await Booking.find({ user: userId });
        
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }
        
        const bookingsWithUser = await Promise.all(bookings.map(async booking => {
            // Find user for each booking
            const user = await User.findById(booking.user);
            const doctor=await Doctor.findById(booking.doctor)
            if (!user) {
                return null; // Or handle the case where user is not found
            }
            return {
                _id: booking._id,
                doctor: doctor,
                user: user,
                appointmentDate: booking.appointmentDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            };
        }));
        
        res.json(bookingsWithUser.filter(booking => booking !== null)); // Filter out null values
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  createBooking,
  getBookingsByUserId
};

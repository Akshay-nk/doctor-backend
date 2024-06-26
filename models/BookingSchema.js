// Booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: {
      type: Date,
     // required: true,
    },
    // status: {
    //   type: String,
    //   enum: ["pending", "approved", "cancelled"],
    //   default: "pending",
    // },
    // isPaid: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

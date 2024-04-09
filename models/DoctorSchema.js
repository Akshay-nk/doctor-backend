const mongoose= require('mongoose') 

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },

  // Fields for doctors only
  speciality: { type: String },
  qualifications: {
    type: String,
  },

  experiences: {
    type: String,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "approved",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const doctors = mongoose.model('doctors',DoctorSchema)

module.exports=doctors;
const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, 
         validator(value){
          if(!validator.isEmail(value)){
            throw new Error("invalid email")
          }
         }
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const users = mongoose.model('users',UserSchema)

module.exports=users;
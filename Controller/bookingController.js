const User = require('../models/UserSchema')
const Doctor = require('../models/DoctorSchema');
const Booking = require("../models/BookingSchema");

const Stripe = require('stripe')


exports.getCheckOutSession = async (req, res) => {
    console.log("inside booking controlleer");

    try {
        
        const doctor = await Doctor.findById(req.params.doctorId)
        const user = await User.findById(req.payload)
        // console.log(doctor,user)

        const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY)

        //creatting checkout session

        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/success`,
            cancel_url: `${req.protocol}://${req.get("host")}/doctor/${doctor.doctorId}`,
            line_items: [{
                price_data: {
                    currency: "usd",
                    unit_amount: doctor.ticketPrice + 100,
                    product_data: {
                        name: doctor.name,
                        description: doctor.bio,
                        images: [doctor.photo]
                    }
                }, quantity: 1
            }
            ]

        })

        console.log(session);

        //create new booking

        const Booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        })

        await Booking.save()
        res.status(200).json({url:session.url})





    } catch (error) {
        res.status(401).json("checkout error")
    }
}
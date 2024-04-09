const expres = require('express')
const router=new expres.Router()
const usercontroller =require('../Controller/userController')
const reviewcontroller =require('../Controller/reviewController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const doctorcontroller=require('../Controller/doctorController')
const bookingcontroller=require('../Controller/bookingController')
//register

router.post('/user/register',usercontroller.register )

//login

router.post('/user/login',usercontroller.login )

//get user details

router.get('/user/profile',jwtMiddleware,usercontroller.profile)

//add review

router.post('/review/add',jwtMiddleware,reviewcontroller.addReview)

//get review
router.get('/review/all',jwtMiddleware,reviewcontroller.allReviews)

//getdoctor

router.get('/doctor/all',doctorcontroller.getDoctor)

//get a doctor

router.get("/doctor/:id",doctorcontroller.getADoctor)

//booking

router.post("/checkout/:doctorId",jwtMiddleware,bookingcontroller.getCheckOutSession)


module.exports=router
const review =require('../models/ReviewSchema')


 exports.addReview =async (req,res)=>{
    console.log("inside add review function")
    const user=req.payload
     
     
    
    const {reviewText,rating,doctor}=req.body
    console.log(doctor);
    //console.log()
   

    try {

       
            const newReview=new review({
    
        reviewText,rating,user,doctor 
            })
            await newReview.save()
            res.status(200).json(newReview)
        
        
    } catch (error) {
        res.status(401).json(`Request failed ${error}`)
    }
}

//get reviews

exports.allReviews=async(req,res)=>
{
    console.log("get review section");
    const user=req.payload
    const {doctor:doctor}=req.body
    console.log(doctor);
    try{
        const allReview=await review.find({doctor})
        res.status(200).json(allReview)

    }
    catch(error)
    {
        res.status(401).json(error)

    }
}
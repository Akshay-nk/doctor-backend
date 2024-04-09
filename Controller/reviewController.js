const review =require('../models/ReviewSchema')


 exports.addReview =async (req,res)=>{
    console.log("inside add review function")
    const user=req.payload
     const doctor=req.payload
     console.log(doctor);
    
    const {reviewText,rating}=req.body
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
    try{
        const allReview=await review.find({user})
        res.status(200).json(allReview)

    }
    catch(error)
    {
        res.status(401).json(error)

    }
}
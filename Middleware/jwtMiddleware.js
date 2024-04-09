const jwt=require('jsonwebtoken')

const jwtMiddleware=async(req,res,next)=>{

     console.log("inside jwtMiddleware function")
     const token=req.headers['authorization'].split(" ")[1]
      //console.log(token)
     try{
        const jwtResponse = jwt.verify(token,"secret123")
        //console.log(jwtResponse)
        req.payload=jwtResponse.userId
        next()
     }
     catch{
        res.status(401).json("Authorization failed!! please login")
     }



}

module.exports=jwtMiddleware
const users=require('../models/UserSchema')
const jwt=require("jsonwebtoken")

//register

exports.register= async (req,res)=>{
    console.log("inside register controller function");
    const {email,password,name,role,photo,gender} = req.body

   try {
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json("user already exists ...please login!!!")
    }else{
        const newUser = new users({
            name,email,password,role,photo,gender
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
}
catch(err){
    res.status(401).json(`Register API failed, Error :${err}`)
}

   
}

// login

exports.login=async (req,res)=>{
    console.log("inside login controller function");
    const {email,password} = req.body
    try{
        const exisitingUser = await users.findOne({email,password})
        if(exisitingUser){
            const token= jwt.sign({userId:exisitingUser._id},"secret123")
            const userRole=exisitingUser.role
            res.status(200).json({
                exisitingUser,token,userRole
            });
        }else{
            res.status(404).json("incorrect email/password")
        }
    }
    catch(err){
        res.status(401).json(`login API Failed , Error:${err}`)
    }
}

//profile 

exports.profile = async (req, res) => {
    console.log("inside profile section");
    const userId=req.payload
    console.log(userId);

    try {
        const user = await users.findById(userId);
        
        if (!user) {
            return res.status(400).json('User not found');
        }

        // Omitting password from the response
        const { password, ...rest } = user._doc;

        // Sending the user data in the response
        res.status(200).json(rest);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Internal server error');
    }
};

exports.appointments=async(req,res)=>{
    
}
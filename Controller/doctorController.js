//get doctor details

const Doctors=require('../models/DoctorSchema')

exports.getDoctor=async(req,res)=>{
    console.log("inside get doctor");
     try {
        const getDoctor=await Doctors.find()
        res.status(200).json(getDoctor)
        
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getADoctor=async(req,res)=>{
    console.log("inside a special doctor");
    try {
        let id = req.params.id;
        const getOneDoctor= await Doctors.findById(id);
        
        if(!getOneDoctor){
            return res.status(404).json({message:"No Doctor Found"})
        }
        res.status(200).json(getOneDoctor)
        
    } catch (error) {
        res.status(500).json(error);
    }
}
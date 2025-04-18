const User = require('../../models/Master/userMaster');

// get user by id

exports.getUserById = async(req, res)=>{
    try{
        const user =await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({
            message:"user found",
            data:user,
            status:"success",
            success:true
        })
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const Client = require('../../models/Master/clientMaster');

// get clent by id
exports.getClientById = async(req, res)=>{
    try{
        const client = await Client.findById(req.params.id);
        if(!client){
            return res.status(404).json({message:"Client not found"})
        }
        res.status(200).json({
            message:"client found",
            data:client,
            status:"success",
            success:true
        })

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
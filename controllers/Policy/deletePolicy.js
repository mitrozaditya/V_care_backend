const policy = require('../../models/Policy/policy');
const Polocy = require('../models/policy');

// delete Policy
exports.deletePolicy = async (req,res) =>{
    try{
        const id = req.params.id
        const policy =await policy.findByIdAndDelete(id)
        res.status(200).json({
            message:'Policy deleted successfully',
            status:'success',
            success: true,
            
        })

    }
    catch(error){
        res.status(500).json({
            message: 'Error deleting Policy',
            status: 'error',
            success: false,
            error: error.message
        })
    }
}
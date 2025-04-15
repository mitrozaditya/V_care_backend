const Enquiry = require('../../models/enquiry/enquiry');

// get enquiry by id
exports.getEnquiryById = async(req, res)=>{
    try{
        const enquiry =await Enquiry.findById(req.params.id)
        .populate([
            { path: 'client_id' },
            { path: 'assign_to' }
        ]);
        
        
        if(!enquiry){
            return res.status(404).json({message:"Enquiry not found"})
        }
        res.status(200).json({
            message:"enquiry found",
            data:enquiry,
            status:"success",
            success:true
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

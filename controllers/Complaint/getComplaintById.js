const Complaint = require('../../models/Complaint/complaint');

// get complaint by id
exports.getComplaintById = async (req, res) =>{
    try{
        const{id} = req.params;
        const complaint = await Complaint.findById(id)
        .populate('client_id')
        .populate('assign_to')
        res.status(200).json({
            message:"Complaint Fetched Successfully",
            success: true,
            status: "success",
            data: complaint
        })

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
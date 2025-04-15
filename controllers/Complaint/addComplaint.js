const Complaint = require('../../models/Complaint/complaint');

// add complaint
exports.addComplaint = async (req, res) =>{
    try{
        const {client_id,category,assign_to,complaint_details,address}=req.body;
        const complaint = new Complaint({
            client_id,
            category,
            assign_to,
            complaint_details,
            address
        })
        await complaint.save();
        res.status(201).json({
            message:"Complaint Added Successfully",
            success: true,
            status: "success",
            data: complaint 
        })

    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}
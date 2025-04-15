const Challan = require('../../models/Challan/challan');

// get challan by enquiry id

exports.getChallanByEnquiryId = async (req, res) => {
    try {
        const { enquiryId } = req.params;
        // Validate input
        if (!enquiryId) {
            return res.status(400).json({ message: "Enquiry ID is required" });
        }
        // Find the challan by enquiry ID
        const challan = await Challan.find({ enquiry_id: enquiryId })
        .populate({
            path: 'products',
            populate: {
                path: 'product_id',
                model: 'Product_Master', // Ensure this model name is correct
                select: 'product_name unit_price unit waranty_period'
            }
        })
           
            .populate('assign_to')
        if (!challan) {
            return res.status(404).json({ message: "Challan not found" });
        }
        res.status(200).json({
            message: "Challan fetched successfully",
            success: true,
            status: "success",
            data: challan
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            status: "error"
        });
    }

};
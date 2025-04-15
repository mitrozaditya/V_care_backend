const ComplaintChallan = require('../../../models/Challan/complaintChallan');

// get challan by complaint id

exports.getComplaintByChallan = async (req, res) => {
    try {
        const { id } = req.params;
        const complaintChallan = await ComplaintChallan.find({ complaint_id: id })
        .populate({
            path: 'products',
            populate: {
                path: 'product_id',
                model: 'Product_Master',
                select: 'product_name unit_price unit waranty_period'
            }
        })
        .populate('assign_to')
        
        if (complaintChallan) {
            res.status(200).json({
                message: 'Complaint Challan',
                success: true,
                status: "success",
                data: complaintChallan
            })

        }

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}
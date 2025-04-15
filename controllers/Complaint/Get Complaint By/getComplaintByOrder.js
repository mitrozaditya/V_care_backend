const Complaint_Order = require('../../../models/Order/complaintOrder');
const mongoose = require('mongoose');

// get order list  by complaint id
exports.getComplaintByOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaint_Order.find({ complaint_id: id })
            .populate('complaint_id')

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({
            status: "success",
            success: true,
            message: "Complaint fetched successfully",
            data: complaint
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}
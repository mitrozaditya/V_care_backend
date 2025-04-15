const Enquiry = require("../../models/enquiry/enquiry");
// update enquiry

exports.updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
        res.status(200).json({
            message: "Enquiry updated successfully",
            success: true,
            status: "success",
            data: enquiry
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
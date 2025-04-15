const Enquiry = require('../../models/enquiry/enquiry');

// delete enquiry
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" })
        }
        res.status(200).json({
            message: "Enquiry deleted successfully",
            status: "success"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

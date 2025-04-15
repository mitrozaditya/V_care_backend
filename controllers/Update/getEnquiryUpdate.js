const Update = require("../../models/Update/enquiryUpdate");

exports.getEnquiryUpdate = async (req, res) => {
    try {
        const { enquiryId } = req.params;

        
        // console.log("Received Params:", req.params); // Debugging log


        // Check if enquiryId is provided
        if (!enquiryId) {
            return res.status(400).json({
                success: false,
                status: "error",
                message: "Missing enquiryId parameter"
            });
        }

        // Fetch updates by enquiry_id
        const updates = await Update.find({ enquiry_id: enquiryId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            status: "success",
            message: "Enquiry updates fetched successfully",
            data: updates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

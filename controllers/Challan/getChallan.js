const Challan = require("../../models/Challan/challan")

// get all challans
exports.getChallans = async (req, res) => {
    try {
        let { page = 1, limit = 10, search } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;
        // Get total count of challans

        // apply search query



        const total_items = await Challan.countDocuments();

        const challans = await Challan.find()
            .skip(skip)
            .limit(limit);


            
        

        res.status(200).json({
            message: 'Challans fetched successfully',
            success: true,
            status: "success",
            data: challans,

            pagination: {
                total_pages: Math.ceil(total_items / limit),
                has_next_page: page * limit < total_items,
                has_prev_page: page > 1
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
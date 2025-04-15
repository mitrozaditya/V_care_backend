const category = require("../../models/Category/productCategory")

// get All category
exports.getAllCategory = async (req, res) => {

    try {
        const { page = 0, limit = 0, search } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total_items = await category.countDocuments();
        let allCategory;
        let totalCategory;

        // apply search filter


        if (parseInt(page) === 0 && parseInt(limit) === 0) {
            // If page or limit is 0, return all records
            allCategory = await category.find();
            totalCategory = category.length;
        } else {
            // Apply pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            allCategory = await category.find()

                .skip(skip)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 })
            totalCategory = await category.countDocuments();
        }


        // const allCategory = await category.find();
        res.status(200).json({
            message: "All Category",
            success: true,
            data: allCategory,
            summary: {
                total_items
            },
            pagination: parseInt(page) !== 0 && parseInt(limit) !== 0 ? {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCategory / parseInt(limit)),
                total_products: totalCategory
            } : null,
            //     
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
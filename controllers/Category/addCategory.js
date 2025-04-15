const category = require("../../models/Category/productCategory")

exports.addCategory = async (req, res) => {

    // add category
    try {
        const { category_name } = req.body;
        // Check if category already exists
        const existingCategory = await category.findOne({ category_name });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists",
                success: false,
            });
        }

        const newCategory = new category({
            category_name
        });
        


        await newCategory.save();
        res.status(201).json({
            message: "Category added successfully",
            success: true,
            status: "success",
            data: newCategory
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
}

// ********************************************************************
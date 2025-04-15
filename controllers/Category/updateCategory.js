const Category = require("../../models/Category/productCategory");

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;
        const updateCategory = await Category.findByIdAndUpdate(id, {
            category_name
        }, { new: true });
        res.status(200).json({
            message: "Category updated successfully",
            success: true,
            status: "success",
            data: updateCategory
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        });
    }
}
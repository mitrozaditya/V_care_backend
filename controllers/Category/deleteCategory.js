const Category = require("../../models/Category/productCategory");

// delete category
exports.deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.status(200).json({
            message: "Category deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};

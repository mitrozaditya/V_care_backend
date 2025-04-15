const Category = require("../../models/Category/productCategory")

// get products by category id


// get category by id
exports.getCategoryById = async (req, res) => {
  try {
    const _id = req.params.id;

    const categoryList = await Category.findById(_id)
      .populate({
        path: 'product',
        model: 'Product_Master',
        select: 'product_name unit_price product_category product_description' // Choose fields to return
      });

    if (!categoryList) {
      return res.status(404).json({ message: 'Category not found', success: false });
    }

    res.status(200).json({
      message: 'Category list',
      success: true,
      data: categoryList
    });
  } catch (error) {
    // console.error('Error fetching category:', error);
    res.status(500).json({
      message: 'Server error',
      error
    });
  }
};
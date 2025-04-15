const Product = require('../../models/Master/productMaster');

// i want to get all product without barcode 
exports.getProductWithoutBarcode = async (req, res) => {
    try {
        const { search } = req.query;
        let query = { isBarcode: false };

        // Apply search filter if provided
        if (search) {
            query.product_name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        const products = await Product.find(query).populate('product_category', 'category_name');

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found without barcode' });
        }
        res.status(200).json({
            status: "success",
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching products without barcode:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


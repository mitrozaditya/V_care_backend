const Inventory = require('../../models/inventory/inventory')
const Product = require('../../models/Master/productMaster');

exports.getInventory = async (req, res) => {


    try {
        const { search, page = 1, limit = 10 } = req.query;
        const query = {};

        // if (search) {
        //     query.$or = [
        //         { product_Name: { $regex: search, $options: 'i' } },
        //         { product_barcode: { $regex: search, $options: 'i' } }
        //     ];
        // }

        // const skip = (parseInt(page) - 1) * parseInt(limit);
        // Perform a search using regex for product name or barcode

        if (search) {
            // Search using regex for product_name in Product model
            const matchingProducts = await Product.find({
                product_name: { $regex: search, $options: 'i' }
            }).select('_id');

            query.$or = [
                { product_barcode: { $regex: search, $options: 'i' } },
                { product_Name: { $in: matchingProducts.map(product => product._id) } }
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);


        const inventory = await Inventory.find(query)
            // .populate('product_id')
            .populate({
                path: 'product_id', // Assuming this is a reference to another collection
                populate: {
                    path: 'product_category', // Assuming this is a reference to another collection
                    model: 'Product_Category',// Make sure this matches your model name
                    select: 'category_name'
                }
            })
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Inventory Found",
            data: inventory,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: inventory.length
                // totalItems,
                // totalPages: Math.ceil(totalItems / limit),
                // currentPage: parseInt(page),
            },
            status: "success",
            success: true

        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
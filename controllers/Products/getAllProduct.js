
const Product = require('../../models/Master/productMaster');

exports.getAllProduct = async (req, res) => {
    try {
        // Apply search filter by product name
        const { search, page = 0, limit =0  } = req.query;
        const query = {};

        if (search) {
            query.product_name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        console.log('Search Query:', query);

        let products;
        let totalProducts;
        const total_items = await Product.countDocuments();

        if (parseInt(page) === 0 && parseInt(limit) === 0) {
            // If page or limit is 0, return all records
            products = await Product.find(query).populate('product_category');
            totalProducts = products.length;
        } else {
            // Apply pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            products = await Product.find(query)
                .populate('product_category')
                .skip(skip)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 })
            totalProducts = await Product.countDocuments(query);
        }

        res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            success: true,
            data: products,
            pagination: parseInt(page) !== 0 && parseInt(limit) !== 0 ? {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalProducts / parseInt(limit)),
                total_products: totalProducts
            } : null,
            summary: {
                total_items
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// const Product = require('../../models/Master/productMaster');

// exports.getAllProduct = async (req, res) => {
//     try {
//         const { search, page = 0, limit = 0 } = req.query;
//         const query = {};

//         if (search) {
//             query.product_name = { $regex: search, $options: 'i' }; // Case-insensitive search
//         }

//         console.log('Search Query:', query);

//         let products;
//         let totalProducts;
//         const total_items = await Product.countDocuments();

//         if (parseInt(page) === 0 || parseInt(limit) === 0) {
//             // Return all products when page or limit is 0
//             products = await Product.find(query).populate('product_category');
//             totalProducts = products.length;
//         } else {
//             // Apply pagination
//             const skip = (parseInt(page) - 1) * parseInt(limit);
//             products = await Product.find(query)
//                 .populate('product_category')
//                 .skip(skip)
//                 .limit(parseInt(limit));
//             totalProducts = await Product.countDocuments(query);
//         }

//         // Construct the pagination object if pagination is applied
//         const pagination = (parseInt(page) > 0 && parseInt(limit) > 0) ? {
//             currentPage: parseInt(page),
//             totalPages: Math.ceil(totalProducts / parseInt(limit)),
//             total_products: totalProducts
//         } : null;

//         res.status(200).json({
//             status: 'success',
//             message: 'Products retrieved successfully',
//             success: true,
//             data: products,
//             pagination,
//             summary: {
//                 total_items
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

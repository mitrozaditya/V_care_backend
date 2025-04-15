const Order = require('../../models/Order/order');
const Client = require('../../models/Master/clientMaster');
// const Quotation = require('../../models/Quotation/quotation');
exports.getOrder = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        // Convert page and limit to integers

        let query = {};
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Apply search filter if search query exists
        if (search) {
            const clientIds = await Client.find({
                $or: [
                    { client_name: { $regex: search, $options: 'i' } },
                    { client_phone: { $regex: search, $options: 'i' } }
                ]
            }).distinct('_id');
            query = {
                $or: [
                    { id: { $regex: search, $options: 'i' } }, // Search by Order ID
                    { quotation_id: { $in: clientIds } } // Search by Client Name or Phone
                ]
            };
        }


        const order = await Order.find(query)
            .populate({
                path: 'quotation_id',
                populate: [
                    {
                        path: 'products._id',
                        model: 'Product_Master',
                        select: 'HSN_code product_name product_description price' // Adjust fields you need
                    },
                    {
                        path: 'clientId',
                        model: 'clientMaster'
                    }
                ]
            })

            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        // Get total count of orders
        const totalOrders = await Order.countDocuments();

        // Get status counts
        const statusCounts = await Order.aggregate([
            { $group: { _id: "$order_status", count: { $sum: 1 } } }
        ]);

        // Create a structured summary with default values
        const summary = {
            total_order: totalOrders,
            in_progress: 0,
            pending: 0,
            completed: 0,
        };

        // Update summary based on existing statuses
        statusCounts.forEach(item => {
            if (item._id === 'In Progress') summary.in_progress = item.count;
            if (item._id === 'Completed') summary.completed = item.count;
            if (item._id === 'Pending') summary.pending = item.count;
        });

        res.status(200).json({
            message: 'Order fetched successfully',
            success: true,
            status: "success",
            data: order,

            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalOrders / limitNumber),
                totalOrders,
            },
            summary,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// const Order = require('../../models/Order/order');
// const Client = require('../../models/Master/clientMaster');
// const Quotation = require('../../models/Quotation/quotation'); // Ensure this path is correct
// const mongoose = require('mongoose');

// exports.getOrder = async (req, res) => {
//     try {
//         const { search, page = 1, limit = 10 } = req.query;
//         let query = {};
//         const pageNumber = parseInt(page);
//         const limitNumber = parseInt(limit);

//         if (search) {
//             // Find client IDs matching the search (name or phone)
//             const clientIds = await Client.find({
//                 $or: [
//                     { client_name: { $regex: search, $options: 'i' } },
//                     { client_phone: { $regex: search, $options: 'i' } }
//                 ]
//             }).distinct('_id');

//             // Find quotation IDs linked to the found clients
//             const quotationIds = await Quotation.find({ 
//                 clientId: { $in: clientIds } 
//             }).distinct('_id');

//             // Build the search query for orders
//             query = {
//                 $or: [
//                     { id: { $regex: search, $options: 'i' } }, 
//                     { quotation_id: { $in: quotationIds } }
//                   ]
//             };
//         }

//         const orders = await Order.find(query)
//             .populate({
//                 path: 'quotation_id',
//                 populate: [
//                     {
//                         path: 'products._id',
//                         model: 'Product_Master',
//                         select: 'HSN_code product_name product_description price'
//                     },
//                     {
//                         path: 'clientId',
//                         model: 'clientMaster'
//                     }
//                 ]
//             })
//             .sort({ createdAt: -1 })
//             .skip((pageNumber - 1) * limitNumber)
//             .limit(limitNumber);

//         // Calculate total orders based on the query (including search)
//         const totalOrders = await Order.countDocuments(query);

//         // Aggregate status counts based on the query
//         const statusCounts = await Order.aggregate([
//             { $match: query },
//             { $group: { _id: "$order_status", count: { $sum: 1 } } }
//         ]);

//         // Build summary with default values
//         const summary = {
//             total_order: totalOrders,
//             in_progress: 0,
//             pending: 0,
//             completed: 0,
//         };

//         // Update summary with actual counts
//         statusCounts.forEach(item => {
//             switch (item._id) {
//                 case 'In Progress': summary.in_progress = item.count; break;
//                 case 'Pending': summary.pending = item.count; break;
//                 case 'Completed': summary.completed = item.count; break;
//             }
//         });

//         res.status(200).json({
//             message: 'Orders fetched successfully',
//             success: true,
//             status: "success",
//             data: orders,
//             pagination: {
//                 currentPage: pageNumber,
//                 totalPages: Math.ceil(totalOrders / limitNumber),
//                 totalOrders: totalOrders,
//             },
//             summary,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
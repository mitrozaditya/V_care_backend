const Replace = require('../../models/Replace/replace');
const mongoose = require('mongoose');

// // get all replace product
// exports.getAllReplaceProduct = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search }= req.query;

//         const query = {};
//         page = parseInt(page);
//         limit = parseInt(limit);
//         const skip = (page - 1) * limit;

//         if (search) {
//             const searchRegex = new RegExp(search, 'i');
//             query.$or = [
//                 { complaint_id: searchRegex },
//                 { product_name: searchRegex },
//                 { supplier_name: searchRegex },
//                 { replace_date: searchRegex },
//                 { estimate_receive_date: searchRegex },
//             ];
//         }

//         const replaceProduct = await Replace.find()
//         const totalCount = await Replace.countDocuments(query);

//         const totalPages = Math.ceil(totalCount / limit);





//         res.status(200).json({
//             message: 'Replace Product Fetched Successfully',
//             success: true,
//             status: 'success',
//             data: replaceProduct,
//             pagination: {
//                 currentPage: page,
//                 totalPages: totalPages,
//                 totalItems: totalCount,
//             }
//         })
//     }
//     catch (error) {
//         res.status(500).json({
//             message: 'Server error',
//             error
//         })
//     }
// }





// Get all replace products with pagination and search
exports.getAllReplaceProduct = async (req, res) => {
    try {
        let { page = 1, limit = 10, search, replace_date, estimate_receive_date } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const query = {};

        // Handle string search
        // 🔍 Smart Search
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { product_name: searchRegex },
                { supplier_name: searchRegex },
            ];

            // ObjectId match for complaint_id
            if (mongoose.Types.ObjectId.isValid(search)) {
                query.$or.push({ complaint_id: search });
            }

            // Date-based search for replace_date and estimate_receive_date
            const parsedDate = new Date(search);
            if (!isNaN(parsedDate.getTime())) {
                const startOfDay = new Date(parsedDate);
                startOfDay.setHours(0, 0, 0, 0);

                const endOfDay = new Date(parsedDate);
                endOfDay.setHours(23, 59, 59, 999);

                query.$or.push(
                    { replace_date: { $gte: startOfDay, $lte: endOfDay } },
                    { estimate_receive_date: { $gte: startOfDay, $lte: endOfDay } }
                );
            }
        }

        // 🗓️ Exact date filter for replace_date
        if (replace_date) {
            const date = new Date(replace_date);
            if (!isNaN(date.getTime())) {
                const start = new Date(date);
                start.setHours(0, 0, 0, 0);
                const end = new Date(date);
                end.setHours(23, 59, 59, 999);
                query.replace_date = { $gte: start, $lte: end };
            }
        }

        // 🗓️ Exact date filter for estimate_receive_date
        if (estimate_receive_date) {
            const date = new Date(estimate_receive_date);
            if (!isNaN(date.getTime())) {
                const start = new Date(date);
                start.setHours(0, 0, 0, 0);
                const end = new Date(date);
                end.setHours(23, 59, 59, 999);
                query.estimate_receive_date = { $gte: start, $lte: end };
            }
        }

        const replaceProduct = await Replace.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalCount = await Replace.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);


        // 🔥 Summary counts
        const [pendingCount, processCount, receivedCount] = await Promise.all([
            Replace.countDocuments({ replace_status: 'pending' }),
            Replace.countDocuments({ replace_status: 'process' }),
            Replace.countDocuments({ replace_status: 'received' }),
        ]);
        res.status(200).json({
            message: 'Replace Product Fetched Successfully',
            success: true,
            status: 'success',
            data: replaceProduct,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalCount,
            },
            summary: {
                pending: pendingCount,
                replace_In_process: processCount,
                received_product: receivedCount,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        });
    }
};

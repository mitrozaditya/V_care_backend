const Enquiry = require('../../models/enquiry/enquiry');
const Client = require('../../models/Master/clientMaster')

// get all enquiry

exports.getEnquiry = async (req, res) => {

    try {

        let { search, page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        let query = {};
        // Search filter logic
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            const isObjectId = /^[0-9a-fA-F]{24}$/.test(search);
            const orConditions = [];

            if (isObjectId) {
                orConditions.push({ _id: search });
            }

            // Search for matching clients and get their IDs
            const clients = await Client.find({
                $or: [
                    { client_name: searchRegex },
                    { client_phone: searchRegex }
                ]
            }).select('_id');

            if (clients.length > 0) {
                orConditions.push({ client_id: { $in: clients.map(client => client._id) } });
            }

            if (orConditions.length > 0) {
                query.$or = orConditions;
            }
        }


        const enquiry = await Enquiry.find(query)
            .populate([
                { path: 'client_id' },
                { path: 'assign_to' }
            ])
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Summary using aggregation to get the count of each status
        const statusCounts = await Enquiry.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Total count for pagination
        const totalEnquiries = await Enquiry.countDocuments(query);


        res.status(200).json({
            success: true,
            status: "success",
            data: enquiry,
            summary: {
                totalEnquiries,
                not_contacted: statusCounts.find(item => item._id === 'not_contacted')?.count || 0,
                quotation_sent: statusCounts.find(item => item._id === 'quotation_created')?.count || 0,
                remainder: statusCounts.find(item => item._id === 'remainder')?.count || 0

            },
            pagination: {
                totalEnquiries,
                currentPage: page,
                totalPages: Math.ceil(totalEnquiries / limit)
            }
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
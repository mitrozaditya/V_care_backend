const Complaint = require('../../models/Complaint/complaint');
const Client = require('../../models/Master/clientMaster');

// get all complaints
exports.getComplaint = async (req, res) => {
    try {
        // add pagination and search filter 
        const { search, page = 1, limit = 10 } = req.query;


        // Convert page and limit to integers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Create search query
        const searchQuery = {};



        if (search) {
            const searchRegex = new RegExp(search, 'i');
            const isObjectId = /^[0-9a-fA-F]{24}$/.test(search);
            const orConditions = [];

            // Check if search is a valid ObjectId for Complaint _id
            if (isObjectId) {
                orConditions.push({ _id: search });
            }

            // Search for clients matching name or phone
            const clients = await Client.find({
                $or: [
                    { client_name: searchRegex },
                    { client_phone: searchRegex }
                ]
            }).select('_id');

            const clientIds = clients.map(client => client._id);

            if (clientIds.length > 0) {
                orConditions.push({ client_id: { $in: clientIds } });
            }

            // Handle case where no matching clients or ObjectId found
            if (orConditions.length > 0) {
                searchQuery.$or = orConditions;
            } else {
                // Force no results if search doesn't match any criteria
                searchQuery.$or = [{ _id: null }];
            }
        }


        // Get complaints with pagination and search
        const complaint = await Complaint.find(searchQuery)
            .populate('client_id', 'client_name client_phone')
            .populate('assign_to', 'user_name user_role')
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);




        // Get total count for pagination metadata
        const totalComplaints = await Complaint.countDocuments(searchQuery);



        // .select('user_name user_role')
        res.status(200).json({
            message: "Complaint Fetched Successfully",
            success: true,
            status: "success",
            data: complaint,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalComplaints / limitNumber),
                total_items: totalComplaints,

            },
            summary: {
                total_complaints: totalComplaints,
                // Pending: ,
                // complete: ,


            }
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
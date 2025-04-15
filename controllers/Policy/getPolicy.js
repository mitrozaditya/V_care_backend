const Policy = require('../../models/Policy/policy');

exports.getPolicy = async (req, res) => {
    try {
        const{page=1,limit=10, search}=req.query;
        const skip=(page-1)*limit;

        const {}=req.query;

        // search query search by name or policy number or contact number
        const searchQuery = {
            $or: [
                { customer_name: { $regex: search, $options: 'i' } },
                { insurance_policy_number: { $regex: search, $options: 'i' } },
                { contact_no: { $regex: search, $options: 'i' } },
                { contact_no2: { $regex: search, $options: 'i' } }
            ]
        };
        // if search query is not empty then add to the query
        const query = search ? searchQuery : {};


        const total = await Policy.countDocuments();

        const policy = await Policy.find(query)
        .limit()
        .skip(skip)
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Policy fetched successfully',
            status: 'success',
            success: true,
            data: policy,
            pagination:{
                totalItems: total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                limit: limit
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching policy',
            status: 'error',
            success: false,
            error: error.message
        })
    }
}
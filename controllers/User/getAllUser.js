const User = require("../../models/Master/userMaster");

exports.getAllUser = async (req, res) => {
    try {
        // apply pagination and search filter
        // search by nmae and role and phone number
        const { page = 0, limit = 0, search } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { user_name: { $regex: search, $options: "i" } },
                { user_role: { $regex: search, $options: "i" } },
                { user_phone: { $regex: search, $options: "i" } }
            ];
        }
        const skip = (page - 1) * limit;


        let users;
        let totalUsers;
        const total_items = await User.countDocuments();

        if (parseInt(page) === 0 && parseInt(limit) === 0) {
            // If page or limit is 0, return all records
            users = await User.find(query)
            totalUsers = users.length;
        } else {
            // Apply pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            users = await User.find(query)

                .skip(skip)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 })
            totalUsers = await User.countDocuments(query);
        }



        // const user = await User.find();
        console.log("user");
        res.status(200).json({
            message: "user found",
            status: "success",
            success: true,
            data: users,
            pagination: parseInt(page) !== 0 && parseInt(limit) !== 0 ? {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalUsers / parseInt(limit)),
                total_Users: totalUsers
            } : null,
            summary: {
                total_items
            }
        
            
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
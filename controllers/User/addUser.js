// const User = require("../../models/Master/userMaster");

// exports.addUser = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();

//         res.status(201).json({
//             message: "User Added Successfully",
//             data: user
//         });

//     } catch (err) {
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: err.message
//         });
//     }
// };

const User = require("../../models/Master/userMaster");

// Add User with Validation
exports.addUser = async (req, res) => {
    try {
        const { user_name, user_email, user_phone, user_role, user_address } = req.body;

        // Basic Validation
        if (!user_name || !user_email || !user_phone || !user_role || !user_address) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user_email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        // Validate Phone Number (assuming 10-digit phone numbers)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(user_phone)) {
            return res.status(400).json({
                message: "Invalid phone number. Must be 10 digits.",
                success: false
            });
        }

        // Check for Existing User with Same Email or Phone
        const existingUser = await User.findOne({
            $or: [{ user_email }, { user_phone }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email or phone number already exists",
                success: false
            });
        }

        // Create and Save User
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            message: "User Added Successfully",
            success: true,
            status: "success",
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        });
    }
};


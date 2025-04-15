const User = require('../../../models/user/user')
const bcrypt = require('bcryptjs');


// Register a new Admin
exports.registerUser = async (req, res) => {
    const { user_name, first_name,last_name,email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Create new admin
        const newUser = new User({ user_name,first_name,last_name ,email, password, phone });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully',data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

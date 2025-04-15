const bcrypt = require('bcryptjs');
const Admin = require('../../../models/admin/admin');

// Register a new Admin
exports.registerAdmin = async (req, res) => {
    const { user_name, first_name, last_name, email, role, password, phone } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

        // Create new admin
        const newAdmin = new Admin({ user_name, first_name, last_name, email, role, password, phone });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

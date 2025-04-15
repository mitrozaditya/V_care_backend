const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../../models/admin/admin');
// const sendOTP = require('../../../utils/sendOtp');

// Admin Login - Generate OTP
// exports.login = async (req, res) => {
//     const { emailOrUsername, password } = req.body;

//     try {
//         const admin = await Admin.findOne({
//             $or: [{ email: emailOrUsername }, { user_name: emailOrUsername }]
//         });
//         if (!admin) return res.status(400).json({ message: 'Admin not found' });

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

//         admin.otp = otp;
//         admin.otp_expiry = otpExpiry;
//         await admin.save();

//         // Send OTP via Email
//         await sendOTP(admin.email, otp);

//         res.status(200).json({ message: 'OTP sent to email', email: admin.email });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // // OTP Verification
// exports.verifyOTP = async (req, res) => {
//     const { emailOrUsername, otp } = req.body;

//     try {
//         const admin = await Admin.findOne({
//             $or: [{ email: emailOrUsername }, { user_name: emailOrUsername }]
//         });

//         if (!admin || admin.otp !== otp || new Date() > admin.otp_expiry) {
//             return res.status(400).json({ message: 'Invalid or expired OTP' });
//         }

//         // Clear OTP after verification
//         admin.otp = null;
//         admin.otp_expiry = null;
//         await admin.save();

//         // Generate JWT Token
//         const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };


// Admin Login - Without OTP Verification
exports.login = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const admin = await Admin.findOne({
            $or: [{ email: emailOrUsername }, { user_name: emailOrUsername }]
        });
        console.log(admin);
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id, role: admin.role, user_name: admin.user_name, email: admin.email, phone: admin.phone, first_name: admin.first_name, last_name: admin.last_name }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



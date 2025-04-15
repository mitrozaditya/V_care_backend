const User = require('../../../models/user/user');

exports.login = async (req, res) => {
    const { emailOrUsername, password ,method } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { user_name: emailOrUsername }]

        });
        if (!user) res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid password'});


        // generate OTP
        const otp = Math.floor(100000 + Math.random()* 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

        user.otp = otp;
        user.otp_expiry = otpExpiry;
        await user.save();

        // send OTP via phone
        await sendOTP(user.phone, otp);


    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
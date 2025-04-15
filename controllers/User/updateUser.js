const User = require("../../models/Master/userMaster");
// update user
exports.updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            status: "success",
            success: true,
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

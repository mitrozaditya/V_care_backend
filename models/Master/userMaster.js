const mongoose = require('mongoose');

const userMasterSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_phone: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    user_address: {
        type: String,
        required: true
    },


}, { timestamps: true }
);
module.exports = mongoose.model('User_Master', userMasterSchema);
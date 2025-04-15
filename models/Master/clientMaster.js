const mongoose = require('mongoose');



const clientMasterSchema = new mongoose.Schema({
    client_name: {
        type: String,
        required: true
    },
    client_email: {
        type: String,
        required: true
    },
    client_phone: {
        type: String,
        required: true
    },
    client_company: {
        type: String,
        // required: true
    },
    client_address: {
        type: String,
        required: true
    },

    mapLinks: [],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);
module.exports = mongoose.model('clientMaster', clientMasterSchema);
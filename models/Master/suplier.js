const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplier_name: {
        type: String,
        required: true
    },
    supplier_email: {
        type: String,
        // required: true
    },
    supplier_phone: {
        type: String,
        required: true
    },
    supplier_company: {
        type: String,

    },
    supplier_address: {
        type: String,
        required: true
    },

},{timestamps: true});


module.exports = mongoose.model('Supplier_Master', supplierSchema);
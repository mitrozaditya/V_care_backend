const mongoose = require('mongoose');
const amcMasterSchema = new mongoose.Schema({

    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
    },

    amc_start_date: {
        type: Date,
        required: true
    },
    amc_end_date: {
        type: Date,
        required: true
    },
    amc_amount: {
        type: Number,
        required: true
    },
    amc_status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },


},
    { timestamps: true }
);
module.exports = mongoose.model('AMC_Master', amcMasterSchema);
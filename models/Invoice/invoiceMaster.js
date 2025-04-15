const mongoose = require('mongoose');

const invoiceMasterSchema = new mongoose.Schema({
    invoice_id: {
        type: String,
        default: 'INV20250001'
    },
    challan_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challan',
        required: true
    }],
    invoice_items: [

    ],
    taxable_amount: {
        type: Number,
        required: true
    },
    discount_amount: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    enquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
        // required: true
    },
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        // required: true
    },

    total_amount: {
        type: Number,
        required: true
    },
    net_amount: {
        type: Number,
        required: true
    },
    received_amount: {
        type: Number,
        default: 0
    },
    remaining_amount: {
        type: Number,

    },
    isAMC: {
        type: Boolean,
        default: false
    },
    payment_status: {
        type: String,
        //     enum: ['pending', 'paid'],
        default: 'pending'
    },
    terms_and_conditions: {
        type: String,
        default: `Product are having warranty as per company policy. No warranty on any fitting accessories (Cable/BNC/DC) or any.
        90% Advance payment with order confirmation and remaining 10% on the day of installation.
        This quotation is valid for 15 days only.`
    },


}, { timestamps: true });

module.exports = mongoose.model('Invoice_Master', invoiceMasterSchema);

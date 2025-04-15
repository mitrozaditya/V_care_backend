const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    order_id: {
        type: String,
        default:'ORD20250001'
    },
    quotation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotation',
        required: true
    },
    enquiryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
        required: true
    },
    // order_date: {
    //     type: Date,
    //     required: true
    // },
    is_quotation_generated: {
        type: Boolean,
        default: true
    },
    order_status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    // estimate_required_time: {
    //     type: String,
    //     required: true
    // },
    
},
{timestamps: true}
);
module.exports = mongoose.model('Order', orderSchema);
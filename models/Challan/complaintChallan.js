const mongoose = require('mongoose');

const complaintChallanSchema = new mongoose.Schema({
    challan_id: {
        type: String,
        default: 'CHN20250001'
    },

    product_barcode: [
    //     {
    //     product_barcode: { type: String },
    //     product_name: { type: String },
    //     quantity: { type: String },
    //     unit: { type: String },
    //     product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    // }
],

    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complaintOrder',
        required: true
    },
    assign_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Master',
        required: true
    }],

    products: [
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Product_Master',
        // required: true
    ],

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    note: {
        type: String,
        // required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    // submitted_date: {
    //     type: Date,
    //     default: Date.now
    // },
    audio_path: {
        type: String,

    }


},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Complaint_Challan', complaintChallanSchema);
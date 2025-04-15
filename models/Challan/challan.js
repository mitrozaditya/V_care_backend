const mongoose = require('mongoose');

const challanSchema = new mongoose.Schema({
    challan_id: {
        type: String,
        default: 'CHN20250001'
    },

    product_barcode: [{
        product_barcode: { type: String },
        product_name: { type: String },
        quantity: { type: String },
        unit: { type: String },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
      }],
      
    enquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
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

module.exports = mongoose.model('Challan', challanSchema);
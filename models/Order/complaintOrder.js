
const mongoose = require('mongoose');
const complaintOrderSchema = new mongoose.Schema({
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        required: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientMaster',
        required: true
    },
    order_status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userMaster',
        required: true
    },
    order_items: [
        // {
        //     // product_id:{
        //     //     type: mongoose.Schema.Types.ObjectId,
        //     //     ref: 'productMaster',
        //     //     required: true
        //     // },

        //     product_name: String,
        //     unit: String,
        //     unit_price: Number,
        //     quantity: Number,
        //     amount: Number,
        //     tax: Number
        //   }
       
    ],
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ComplaintOrder', complaintOrderSchema)
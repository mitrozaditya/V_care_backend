const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientMaster',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Master',
        required: true
    },
    complaint_details: {
        type: String,
        required: true
    },
    address: {
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['Pending','Resolved','Rejected'],
        default: 'Pending'
    }


},
    { timestamps: true }
)
module.exports = mongoose.model('Complaint', complaintSchema);
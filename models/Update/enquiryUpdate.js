const mongoose = require('mongoose');

const enquiryUpdateSchema = new mongoose.Schema({
    enquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
        required: true
    },
    update_note: {
        type: String,
        required: true
    },
    follow_up_date: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: true
    }

},
    { timestamps: true }
)
module.exports = mongoose.model('Enquiry_Update', enquiryUpdateSchema);
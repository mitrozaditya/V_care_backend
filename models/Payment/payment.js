const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice_Master',
        required: true
    },

    payment_mode: {
        type: String,
        required: true
    },
    payment_date: {
        type: String,
        required: true
    },
    received_amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid'],
        // required: true
    },
    remaining_amount: { // ✅ Ensure this field exists
        type: Number,
        required: true
    },

},
{timestamps: true}
)
module.exports = mongoose.model('Payment' ,paymentSchema);
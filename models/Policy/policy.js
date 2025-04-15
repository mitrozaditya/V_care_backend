const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    contact_no: {
        type: String,
        required: true
    },
    contact_no2: {
        type: String,
        required: true
    },
    insurrance_company: {
        type: String,
        required: true
    },
    insurance_name: {
        type: String,
        required: true
    },
    insurance_policy_number: {
        type: String,
        required: true
    },
    insurance_start_date: {
        type: Date,
        required: true
    },
    insurance_end_date: {
        type: Date,
        required: true
    },
    premium_date: {
        type: Date,
        required: true
    },
    next_premium_date: {
        type: Date,
        required: true
    },
    premium_price: {
        type: String,
        required: true
    },
    sum_assured: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);
module.exports = mongoose.model('Policy', policySchema);







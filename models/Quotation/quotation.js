const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({

    quotation_id: {
        type: String,
        default: 'QTN20250001',
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientMaster',
        required: true
    },
    enquiry_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enquiry',
        required: true
    },
    products: [


    ],

    terms_and_conditions: {
        type: String,
        default: `Product are having warranty as per company policy. No warranty on any fitting accessories (Cable/BNC/DC) or any.
90% Advance payment with order confirmation and remaining 10% on the day of installation.
This quotation is valid for 15 days only.`
    },


    total_amount: {
        type: Number,
        // default: auto
    },
    discount: {
        type: Number,
        default: 0
    },
    net_amount: {
        type: Number
    },
    taxable_amount: {
        type: Number
    },
    discount_amount: {
        type: Number
    }


},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Quotation', quotationSchema);
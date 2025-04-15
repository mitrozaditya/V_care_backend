const mongoose = require('mongoose');

const productMasterSchema = new mongoose.Schema({
    product_id: {
        type: String,
        default: 'PRD20250001'
    },
    product_name: {
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product_Category',
        // type: String,
        // required: true
    },
    unit: {
        type: String,
        required: true
    },
    waranty_period: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    HSN_code: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    low_stock_quantity: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    isBarcode: {
        type: Boolean,
        default: true
    },

},
    { timestamps: true }
);
module.exports = mongoose.model('Product_Master', productMasterSchema);
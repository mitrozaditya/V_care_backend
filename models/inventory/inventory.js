
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier_Master'
    },
    product_barcode: {
        type: String,
        // required: true
    },
    purchased_price: {
        type: Number,
        // required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product_Master'
    },
    // quantity: { type: Number, required: true },
    // date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'sold'],
        default: 'pending'
    },
    tax: {
        type: Number,
        default: 0
    },
    // product_quantity: {
    //     type: Number,
    //     default: 1
    // }
},
    { timestamps: true }
);
module.exports = mongoose.model('Inventory', inventorySchema);
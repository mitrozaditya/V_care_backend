const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_description: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product_Master'
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('Product_Category', categorySchema)
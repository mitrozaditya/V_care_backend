
const mongoose = require('mongoose');
const unitSchema = new mongoose.Schema({
    unit_name: {
        type: String,
        required: true
    },

},
    { timestamps: true }
)
module.exports = mongoose.model('Unit', unitSchema);
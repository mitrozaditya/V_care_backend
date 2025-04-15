const  mongoose = require('mongoose');
const replaceSchema = new mongoose.Schema({
   
    replace_id: {
        type: String,
        default: 'RPL20250001',
    },
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complaint',
        required: true
    },
    product_name:{
        type:String,
        required:true
    },
    supplier_name:{
        type:String,
        required:true
    },
    replace_date:{
        type:Date,
        required:true
    },
    estimate_receive_date:{
        type:Date,
        required:true
    },
    
    replace_status:{
        type:String,
        default:"pending"
    }


},
{timestamps:true}
)
module.exports = mongoose.model('replace', replaceSchema);

const mongoose = require('mongoose');

// const enquirySchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     // name: { type: String, required: true },
//     client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clientMaster', required: true },
//     enquiry_for: { type: String, required: true },
//     date: { type: Date, required: true },
//     assign_to: { type: String, required: true },
//     status: { type: String, required: true },
//     // phone: { type: String, required: true },
//     // company_name: { type: String, required: true },
//     // sub_unit: { type: String, required: true },
//     // client_email: { type: String, required: true },
//     // address: { type: String, required: true },
//     // phone: { type: String, required: true },
//     map_link: {
//         lat: { type: Number, required: true },
//         lng: { type: Number, required: true },
//     },
//     // contact_person: { type: String, required: true },

// },
//     { timestamps: true }
// );
// module.exports = mongoose.model('Enquiry', enquirySchema);



const enquirySchema = new mongoose.Schema({
    enquiry_id: {
        type: String,
        default: 'ENQ202500001'
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientMaster',
        required: true
    },
    enquiry_for: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    // assign_to: { type: String, required: true },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Master',
        required: true
    },
    status: {
        type: String,
        default: 'not_contacted'
    },
    enquiry_description: {
        type: String
    },
    quotations: [{
        quotation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quotation'
        },
    }]
    // map_link: {
    //     lat: { type: Number, required: true },
    //     lng: { type: Number, required: true },
    // },
},
    { timestamps: true }
);
module.exports = mongoose.model('Enquiry', enquirySchema);

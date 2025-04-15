const Invoice = require('../../models/Invoice/invoiceMaster');
const Client = require('../../models/Master/clientMaster');
const Complaint = require('../../models/Complaint/complaint');
const Enquiry = require('../../models/enquiry/enquiry');

// exports.getInvoiceByClient = async (req, res) => {
//     try {
//         const { client_id } = req.params;
//         const client = await Client.findById(client_id);
//         if (!client) {
//             return res.status(404).json({
//                 message: 'Client not found',
//                 success: false,
//                 status: 'error'
//             });
//         }
//         const invoices = await Invoice.find({ client_id: client_id });
//         const complaints = await Complaint.find({ client_id: client_id });
//         res.status(200).json({
//             message: 'Invoices fetched successfully',
//             success: true,
//             status: 'success',
//             data: {
//                 invoices,
//                 complaints
//             }
//         });
//     }

//     catch (error) {
//         res.status(500).json({
//             message: 'Error fetching invoices',
//             success: false,
//             status: 'error',
//             error: error.message
//         });
//     }
// };







exports.getInvoiceByClient = async (req, res) => {
    try {
        const { client_id } = req.params;

        // Check if client exists
        const client = await Client.findById(client_id);
        if (!client) {
            return res.status(404).json({
                message: 'Client not found',
                success: false,
                status: 'error'
            });
        }

        // Step 1: Find all enquiries for the client
        const enquiries = await Enquiry.find({ client_id: client_id }).select('_id');
        const enquiryIds = enquiries.map(enquiry => enquiry._id);

        // Step 2: Fetch all invoices with matching enquiry_id
        const invoices = await Invoice.find({ enquiry_id: { $in: enquiryIds } })
            .populate({
                path: 'enquiry_id',
                populate: { path: 'client_id' }
            });

        // Step 3: Fetch all complaints for the client
        const complaints = await Complaint.find({ client_id });

        // Success response
        res.status(200).json({
            message: 'Invoices fetched successfully',
            success: true,
            status: 'success',
            data: {
                invoices,
                complaints
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching invoices',
            success: false,
            status: 'error',
            error: error.message
        });
    }
};

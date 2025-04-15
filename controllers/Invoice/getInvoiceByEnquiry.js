const Invoice = require('../../models/Invoice/invoiceMaster');

exports.getAllInvoiceByEnquiry = async (req, res) => {
    try {
        const { enquiry_id } = req.params;
        const invoices = await Invoice.findOne({ enquiry_id })
            .populate({
                path: 'enquiry_id',
                select: 'client_id',
                populate: {
                    path: 'client_id',
                    select: 'client_name client_email client_phone client_address',
                }


            })




        if (!invoices) {
            return res.status(200).json({ msg: 'Invoice not found', });

        }
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const Quotation = require('../../models/Quotation/quotation');
const Enquiry = require('../../models/enquiry/enquiry');

// get quotation by enquiry id
exports.getQuotationByEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(400).json({ message: 'Enquiry not found' });
        }
        const quotation = await Quotation.find({ enquiry_id: id })
            .populate('enquiry_id', 'date')
            .populate('clientId')

        res.status(200).json({
            message: 'Quotation found',
            success: true,
            status: 'success',
            data: quotation
        });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
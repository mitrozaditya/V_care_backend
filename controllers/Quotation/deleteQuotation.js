const quotation = require('../../models/Quotation/quotation');


exports.deletequotation = async (req, res) => {
    try {
        const quotationId = req.params.id;
        const deletedquotation = await quotation.findByIdAndDelete(quotationId);
        if (!deletedquotation) {
            return res.status(404).json({ message: 'quotation not found' });
        }
        res.status(200).json({ message: 'quotation deleted successfully', success: true, status: "success" });


    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}
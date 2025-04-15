const Invoice = require('../../../models/Invoice/invoiceMaster');

// get invoice by complaint id

exports.getComplaintByInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const invoice = await Invoice.find({ complaint_id: id })
        
        if (!invoice) {
            res.status(200).json({
                message: "Invoice not found"
            })
        }

        res.status(200).json({
            status: "success",
            success: true,
            message: "Invoice found",
            data: invoice
        })


    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
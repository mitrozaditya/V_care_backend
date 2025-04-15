 const  Invoice = require('../../models/Invoice/invoiceMaster');

//  Update Invoice
exports.updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const {  } = req.body;
        // Find the invoice by ID
        const invoice = await Invoice.findById(id);
        if (!invoice){
            return res.status(404).json({
                message: "Invoice not found",
                success: false,
                status: "error"
            });
        }
            // Update the invoice
           
            const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({
                message: "Invoice updated successfully",
                success: true,
                status: "success",
                data: updatedInvoice
            });
        
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            status: "error"
        });
    }
}
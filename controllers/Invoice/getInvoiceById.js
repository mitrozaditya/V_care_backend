const Invoice = require('../../models/Invoice/invoiceMaster');

const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
        
        // .populate({
        //     path: 'challan_id',
        //     populate: {
        //         path: 'products',
        //         populate: {
        //             path: 'product_id',
        //             model: 'Product_Master', // Ensure this model name is correct
        //             select: 'product_name unit_price unit waranty_period'
        //         }
        //     }
        // });
      
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.status(200).json({
            msg: 'Invoice fetched successfully',
            data: invoice,
            success: true,

        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}
module.exports = getInvoiceById;
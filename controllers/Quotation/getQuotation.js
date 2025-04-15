const Quotation = require('../../models/Quotation/quotation');

exports.getquotation = async (req, res) => {
    try {
        const quotation = await Quotation.find()
        .populate('clientId')
        .populate('products._id');
        
        res.status(200).json({
            message: "quotation fetched successfully",
            data: quotation,
            success: true,
            status: "success"
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
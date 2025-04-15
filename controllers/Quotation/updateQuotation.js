const Quotation = require('../../models/Quotation/quotation');

// updateQuotation

exports.updateQuotation = async (req, res) => {
    try{
        const {id}=req.params;
        const{}=req.body;
        const quotation=await Quotation.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            message: "Quotation updated successfully",
            data: quotation,
            success: true,
            status: "success"
        });

    }
    catch(err){
        res.status(400).json({
            message: err.message
        });
    }
}
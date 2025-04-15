const Challan = require('../../models/Challan/challan')

// update challan
exports.updateChallan = async (req, res) => {
    try {
        const challan = await Challan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!challan) {
            return res.status(404).json({
                message: 'Challan not found',
                success: false,
                status: "error"
            })
        }
        res.status(200).json({
            message: 'Challan updated successfully',
            success: true,
            status: "success",
            data: challan
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
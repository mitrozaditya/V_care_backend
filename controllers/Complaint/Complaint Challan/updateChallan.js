const Challan = require('../../../models/Challan/complaintChallan');

exports.updateChallan = async (req, res) => {
    try {
        const { id } = req.params
        const { } = req.body

        const challan = await Challan.findByIdAndUpdate(id, req.body, { new: true })

        if (!challan) {
            res.status(404).json({
                MessageChannel
            })
        }
        res.status(200).json({
            status: "success",
            success: true,
            message: "Challan updated successfully",
            data: challan
        })
    }

    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
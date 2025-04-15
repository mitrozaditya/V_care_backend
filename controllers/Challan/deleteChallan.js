const Challan = require('../../models/Challan/challan')

// delete challan
exports.deleteChallan = async (req, res) => {
    try {
        const challan = await Challan.findByIdAndDelete(req.params.id);
        if (!challan) {
            return res.status(404).json({
                message: 'Challan not found',
                success: false,
                status: "error"
            })
        }
        res.status(200).json({
            message: 'Challan deleted successfully',
            success: true,
            status: "success",
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
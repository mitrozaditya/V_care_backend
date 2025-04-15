const Challan = require('../../models/Challan/challan')

// get challan by id
exports.getChallanById = async (req, res) => {
    try {
        
        const challan = await Challan.findById(req.params.id)


            .populate({
                path: 'products',
                model: 'Inventory', // Ensure this matches your actual Inventory model
                populate: {
                    path: 'product_id',
                    model: 'Product_Master', // Ensure this is the correct model for product details
                    //   select: 'product_name unit_price product_description '
                }
            });
        if (!challan) {
            return res.status(404).json({
                message: 'Challan not found',
                success: false,
                status: "error"
            })
        }
        res.status(200).json({
            message: 'Challan fetched successfully',
            success: true,
            status: "success",
            data: challan
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
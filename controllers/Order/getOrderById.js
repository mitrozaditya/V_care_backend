const Order = require('../../models/Order/order');
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate({
                path: 'quotation_id',
                populate: [
                    {
                        path: 'products._id',
                        model: 'Product_Master',
                        select: 'HSN_code product_name product_description unit_price' // Adjust fields you need
                    },
                    {
                        path: 'clientId',
                        model: 'clientMaster'
                    }
                ]
            });
        res.status(200).json({
            message: 'Order fetched successfully',
            success: true,
            status: "success",
            data: order
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
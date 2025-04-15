const Enquiry = require('../../models/enquiry/enquiry');
const { populate } = require('../../models/inventory/inventory');

const Order = require('../../models/Order/order');


// get quotation by enquiry id
exports.getOrderByEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(400).json({ message: 'Enquiry not found' });
        }

        const order = await Order.findOne({ enquiryId: id })
            .populate('enquiryId', 'date')
            .populate('quotation_id')
        // .populate({
        //     path: 'quotation_id'
        //     // populate: {
        //     //   path: 'products._id',
        //     //   model: 'Product_Master',
        //     // },
        //   });
        // Flatten products inside the quotation_id
        // if (order?.quotation_id?.products) {
        //     order.quotation_id.products = order.quotation_id.products.map(product => ({
        //         ...product._id._doc, // Extract the document data from mongoose object
        //         quantity: product.quantity // Keep quantity or any other data from the product
        //     }));
        // }

        // Map the products to merge product data and keep the quantity from quotation
        const formattedProducts = order.quotation_id?.products?.map(product => ({
            product_id: product._id,
            product_name: product.product_name,
            unit: product.unit,
            unit_price: product.unit_price,
            quantity: product.quantity,// Using quantity directly from quotation
            // total_amount:  0,

            // i want to add total amount here how to calculate total amount
            total_amount: product.unit_price * product.quantity
        }));

        // Update the products array in the order
        order.quotation_id.products = formattedProducts

        res.status(200).json({
            success: true,
            status: 'success',
            data: order
        });


    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


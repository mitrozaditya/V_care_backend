const Order = require('../../models/Order/order');
const Enquiry = require('../../models/enquiry/enquiry');
const Quotation = require('../../models/Quotation/quotation');
const Counter = require('../../models/Counter/counter');
exports.addOrder = async (req, res) => {
    try {
        const { quotation_id, enquiryId } = req.body;

        // get the next sequence for quotation
        const counter = await Counter.findOneAndUpdate(
            { name: 'order' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const year = new Date().getFullYear();
        const order_id = `ORD${year}${String(counter.seq).padStart(4, '0')}`;


        // Find the quotation using the quotation_id
        const quotation = await Quotation.findById(quotation_id);
        const enquiry = await Enquiry.findById(enquiryId);

        // save order
        const order = new Order({
            quotation_id,
            enquiryId,
            order_id,
        });
        await order.save();

        // Update enquiry status to 'quotation_generated'
        enquiry.status = 'quotation_created';
        await enquiry.save();

        res.status(201).json({
            message: 'Order created successfully',
            success: true,
            status: "success",
            data: order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
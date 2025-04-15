

const Quotation = require('../../models/Quotation/quotation');
const ProductMaster = require('../../models/Master/productMaster');
const Counter = require('../../models/Counter/counter');

// Create Quotation
exports.createquotation = async (req, res) => {
    try {
        const { products, clientId, discount, taxable_amount, net_amount, discount_amount, total_amount, enquiry_id } = req.body;

        // Get the next sequence for quotation
        const counter = await Counter.findOneAndUpdate(
            { name: 'quotation' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const year = new Date().getFullYear();
        const quotation_id = `QTN${year}${String(counter.seq).padStart(4, '0')}`;

        const quotation = new Quotation({
            clientId,
            quotation_id,
            enquiry_id,
            products,
            total_amount,
            discount,
            net_amount,
            taxable_amount,
            discount_amount,
            // quantity
        });

        await quotation.save();

        res.status(201).json({
            message: "Quotation created successfully",
            data: quotation,
            success: true,
            status: "success"
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

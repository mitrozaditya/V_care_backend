const Replace = require('../../models/Replace/replace');
const Counter = require('../../models/Counter/counter');



// add replace product
exports.addReplaceProduct = async (req, res) => {
    try {

        // const counter = await Counter.findOneAndUpdate(
        //     { name: 'replace' },
        //     { $inc: { seq: 1 } },
        //     { new: true, upsert: true }
        // );

        // const year = new Date().getFullYear();
        // const replace_id = `RPL${year}${String(counter.seq).padStart(4, '0')}`;

        const {
            complaint_id,
            product_name,
            supplier_name,
            replace_date,
            estimate_receive_date

        } = req.body;

        const newReplaceProduct = new Replace({
            complaint_id,
            product_name,
            supplier_name,
            replace_date,
            estimate_receive_date,

        })

        await newReplaceProduct.save();
        res.status(201).json({
            message: 'Replace product added successfully',
            success: true,
            status: 'success',
            data: newReplaceProduct
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        })
    }
}
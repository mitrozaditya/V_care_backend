const ProductMaster = require('../../models/Master/productMaster');
const Counter = require('../../models/Counter/counter');

const addProduct = async (req, res) => {
    try {
        const {
            product_name,
            unit_price,
            product_category,
            unit,
            waranty_period,
            // waranty_end_date,
            product_description,
            HSN_code,
            low_stock_quantity,
            tax,
            isBarcode
        } = req.body;


        // get the next sequence for quotation
        const counter = await Counter.findOneAndUpdate(
            { name: 'product' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const year = new Date().getFullYear();
        const product_id = `PRD${year}${String(counter.seq).padStart(4, '0')}`;


        // Check if product already exists
        const existingProduct = await ProductMaster.findOne({ product_name });

        if (existingProduct) {
            return res.status(400).json({
                message: 'Product with this name already exists',
                success: false,
            });
        }
        // Create a new product instance
        const newProduct = new ProductMaster({
            product_name,
            unit_price,
            product_category,
            unit,
            waranty_period,
            // waranty_end_date,
            product_description,
            HSN_code,
            low_stock_quantity,
            // quantity: 0
            tax,
            isBarcode,
            product_id,
        });
        await newProduct.save();
        res.status(201).json({
            message: 'Product added successfully',
            success: true,
            status: "success",
            data: newProduct
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports = { addProduct };
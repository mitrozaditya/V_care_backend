// const Inventory = require('../../models/inventory/inventory');
// const Product = require('../../models/Master/productMaster');
// const mongoose = require('mongoose');

// const addInventory = async (req, res) => {
//     try {
//         const { supplier_id, product_barcode, purchased_price, product_id ,tax} = req.body;

//         // // Validation
//         // if (!product_barcode || typeof product_barcode !== 'string') {
//         //     throw new Error('Invalid or missing product barcode');
//         // }

//         // if (!purchased_price || typeof purchased_price !== 'number') {
//         //     throw new Error('Invalid or missing purchased price');
//         // }

//         // if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
//         //     throw new Error('Invalid or missing product Name (ObjectId)');
//         // }

//         // if (!quantity || typeof quantity !== 'number') {
//         //     throw new Error('Invalid or missing quantity');
//         // }

//         // Check if barcode already exists

//         const existingInventory = await Inventory.findOne({ product_barcode });
//         if (existingInventory) {
//             return res.status(400).json({ success: false, message: 'Product barcode must be unique' });
//         }

//         const inventory = new Inventory({ supplier_id, product_barcode, purchased_price, product_id ,tax});
//         await inventory.save();


//         // Check if Product exists
//         const product = await Product.findById(product_id);
//         if (!product) {
//             throw new Error('Product not found');
//         }
//         // Increment Product Quantity by 1
//         product.quantity += 1;
//         await product.save();

//         res.status(201).json({
//             success: true,
//             status: "success",
//             message: 'Product added successfully',
//             data: inventory
//         });
//     } catch (err) {
//         res.status(400).json({
//             success: false,
//             message: err.message
//         });
//     }
// }


// module.exports = { addInventory };


const Inventory = require('../../models/inventory/inventory');
const Product = require('../../models/Master/productMaster');
const mongoose = require('mongoose');

const addInventory = async (req, res) => {
    try {
        const { supplier_id, product_barcode, purchased_price, product_id, tax, product_quantity } = req.body;

        // Validation
        if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
            throw new Error('Invalid or missing product ID');
        }

        if (!purchased_price || isNaN(Number(purchased_price))) {
            throw new Error('Invalid or missing purchased price');
        }

        if (!tax || isNaN(Number(tax))) {
            throw new Error('Invalid or missing tax amount');
        }

        // Check if Product exists
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let inventory;

        // If product_barcode is missing, use product_quantity
        if (!product_barcode) {
            if (!product_quantity || isNaN(Number(product_quantity)) || Number(product_quantity) <= 0) {
                return res.status(400).json({ success: false, message: 'Invalid or missing product quantity' });
            }

            // Add inventory entry without barcode
            inventory = new Inventory({ 
                supplier_id, 
                purchased_price, 
                product_id, 
                tax, 
                quantity: Number(product_quantity) 
            });
            await inventory.save();

            // Update product quantity
            await Product.findByIdAndUpdate(product_id, { $inc: { quantity: Number(product_quantity) } });

            return res.status(201).json({
                success: true,
                message: "Product inventory added successfully without barcode.",
                updated_quantity: product.quantity + Number(product_quantity),
                inventory
            });
        }

        // Check if barcode already exists
        const existingInventory = await Inventory.findOne({ product_barcode });
        if (existingInventory) {
            return res.status(400).json({ success: false, message: 'Product barcode must be unique' });
        }

        // Add new inventory entry with barcode
        inventory = new Inventory({ supplier_id, product_barcode, purchased_price, product_id, tax });
        await inventory.save();

        // Increment Product Quantity by 1
        await Product.findByIdAndUpdate(product_id, { $inc: { quantity: 1 } });

        res.status(201).json({
            success: true,
            status: "success",
            message: 'Product added successfully',
            data: inventory
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { addInventory };
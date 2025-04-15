const Challan = require('../../../models/Challan/complaintChallan');
const Inventory = require('../../../models/inventory/inventory');
const Product = require('../../../models/Master/productMaster');
const Counter = require('../../../models/Counter/counter');


exports.complaintChallan = async (req, res) => {
    const session = await Inventory.startSession();
    session.startTransaction();

    try {
        const { product_barcode, order_id, assign_to, complaint_id } = req.body;

        // Generate challan ID
        const counter = await Counter.findOneAndUpdate(
            { name: 'Complaint_Challan' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const year = new Date().getFullYear();
        const challan_id = `CHN${year}${String(counter.seq).padStart(4, '0')}`;

        let Inventories = [];

        if (product_barcode && product_barcode.length > 0) {
            for (const item of product_barcode) {
                const barcode = item.product_barcode?.trim();
                const productId = item.product_id;

                let inventory;

                // Try to find by barcode first
                if (barcode) {
                    inventory = await Inventory.findOne({ product_barcode: barcode }).session(session);
                }

                // Fallback to product_id
                if (!inventory && productId) {
                    inventory = await Inventory.findOne({
                        product_id: productId,
                        // status: { $ne: 'sold' }
                    }).session(session);
                }

                if (!inventory) {
                    await session.abortTransaction();
                    return res.status(404).json({
                        success: false,
                        message: `No inventory found for ${barcode ? `barcode ${barcode}` : `product ID ${productId}`}.`
                    });
                }

                Inventories.push(inventory);
            }
        } else {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'At least one product_barcode or product_id must be provided.'
            });
        }

        // Update inventory and product quantity
        let products = [];

        for (let i = 0; i < Inventories.length; i++) {
            const inventory = Inventories[i];
            const requestItem = product_barcode[i];
            const isBarcodePresent = requestItem.product_barcode?.trim();

            if (isBarcodePresent) {
                inventory.status = 'sold';
                await inventory.save();
            }

            const product = await Product.findById(inventory.product_id).session(session);
            if (!product) {
                await session.abortTransaction();
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${inventory.product_id} not found.`
                });
            }

            let reduceQty = 1;

            if (!isBarcodePresent) {
                const requestedQty = parseInt(requestItem.quantity);
                if (!requestedQty || requestedQty < 1) {
                    await session.abortTransaction();
                    return res.status(400).json({
                        success: false,
                        message: `Invalid quantity for product ID ${requestItem.product_id}`
                    });
                }
                reduceQty = requestedQty;
            }

            if (product.quantity < reduceQty) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient quantity for product ${product.product_name}. Requested: ${reduceQty}, Available: ${product.quantity}`
                });
            }

            product.quantity -= reduceQty;
            await product.save();

            const inventoryObj = inventory.toObject(); // convert Mongoose doc to plain object
            inventoryObj.quantity = reduceQty;
            products.push(inventoryObj);

            // products.push(inventory);
            // products.push({
            //   inventory_id: inventory._id,
            //   quantity: reduceQty
            // });
        }

        // Create the challan
        const challan = new Challan({
            challan_id,
            order_id,
            assign_to,
            complaint_id,
            product_barcode,
            products
        });

        const savedChallan = await challan.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Challan created and inventory updated successfully',
            success: true,
            status: 'success',
            data: savedChallan
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ success: false, message: error.message });
    }
};

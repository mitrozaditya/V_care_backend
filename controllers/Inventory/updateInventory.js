const Inventory = require('../../models/inventory/inventory');
const mongoose = require('mongoose');

// updateInventory
exports.updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_barcode, purchaced_price, product_Name, date, quantity } = req.body;

        // Validate if ID is valid
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid inventory ID' });
        }

        // Update Inventory
        const inventory = await Inventory.findByIdAndUpdate(
            id,
            { product_barcode, purchaced_price, product_Name, date, quantity },
            { new: true, runValidators: true }
        );

        // Check if inventory exists
        if (!inventory) {
            return res.status(404).json({ success: false, message: 'Inventory not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Inventory updated successfully',
            data: inventory,
        });
    } catch (err) {
        console.error('Error updating inventory:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
};

const Inventory = require('../../models/inventory/inventory');  

// delete inventory
exports.deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteInventory = await Inventory.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Inventory deleted successfully',
            success: true,
            status: "success",
            data: deleteInventory
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


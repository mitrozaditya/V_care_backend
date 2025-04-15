const Supplier = require('../../models/Master/suplier');

// delete supplier

exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Supplier deleted successfully',
            success: true,
            status: 'success',
            data: supplier
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}   
const Supplier = require('../../models/Master/suplier');

// get supplier by id

exports.getSupplierById = async (req, res) => {
    try {
        const{ id } = req.params;
        const supplier = await Supplier.findById(id);
        res.status(200).json({
            success: true,
            status: 'success',
            data: supplier
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
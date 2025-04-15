const Supplier = require('../../models/Master/suplier');

// update supplier
exports.updateSupplier = async (req, res) => {
    try {
        const { supplier_name, supplier_email, supplier_phone, supplier_company, supplier_address } = req.body;
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, {
            supplier_name,
            supplier_email,
            supplier_phone,
            supplier_company,
            supplier_address
        });
        res.status(200).json({
            message: 'Supplier updated successfully',
            success: true,
            status: 'success',
            data: supplier
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
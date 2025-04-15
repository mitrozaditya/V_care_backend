const Supplier = require('../../models/Master/suplier');

// add supplier
exports.addSupplier = async (req, res) => {
    try {
        const { supplier_name, supplier_email, supplier_phone, supplier_company, supplier_address } = req.body;
        const supplier = new Supplier({
            supplier_name,
            supplier_email,
            supplier_phone,
            supplier_company,
            supplier_address
        });
        // add validation for duplicate supplier phone number
        const existingSupplier = await Supplier.findOne({ supplier_phone });
        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier with this phone number already exists' });
        }
        
        await supplier.save();
        res.status(201).json({
            message: 'Supplier added successfully',
            success: true,
            status: 'success',
            data: supplier
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
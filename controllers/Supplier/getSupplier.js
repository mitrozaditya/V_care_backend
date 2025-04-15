const Supplier = require('../../models/Master/suplier');

// get all suppliers
exports.getSupplier = async (req, res) => {
    try {
        // add search filter
        const { search, page = 0, limit = 0 } = req.query;
        const query = {};
        if (search) {
            query.supplier_name = { $regex: search, $options: 'i' };
        }

        let supplier;
        let totalSupplier;
        const total_items = await Supplier.countDocuments();

        if (parseInt(page) === 0 && parseInt(limit) === 0) {
            // If page or limit is 0, return all records
            supplier = await Supplier.find(query);
            totalSupplier = Supplier.length;
        } else {
            // Apply pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            supplier = await Supplier.find(query)                
                .skip(skip)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 })
            totalSupplier = await Supplier.countDocuments(query);
        }

        res.status(200).json({
            status: 'success',
            message: 'Supplier retrieved successfully',
            success: true,
            data: supplier,
            pagination: parseInt(page) !== 0 && parseInt(limit) !== 0 ? {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalSupplier / parseInt(limit)),
                total_Supplier: totalSupplier
            } : null,
            summary: {
                total_items
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

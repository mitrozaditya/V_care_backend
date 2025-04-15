const Replace = require('../../models/Replace/replace');

// update replace product

exports.updateReplaceProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { } = req.body;
        const updateReplaceProduct = await Replace.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            message: 'Replace product updated successfully',
            success: true,
            status: 'success',
            data: updateReplaceProduct
        })


    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        })

    }

}






















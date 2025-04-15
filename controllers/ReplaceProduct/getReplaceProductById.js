const Replace = require('../../models/Replace/replace');

// get replace product by id


exports.getReplaceProductById = async (req, res) => {
    try {
        const { id } = req.params
        const replaceProduct = await Replace.findById(id);
        if (!replaceProduct) {
            return res.status(404).josn({
                message: 'Replace Product not found',
                success: false,

            })
        }

        res.status(200).json({
            message: 'Replace Product Fetched Successfully',
            success: true,
            status: 'success',
            data: replaceProduct
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error
        })
    }
}
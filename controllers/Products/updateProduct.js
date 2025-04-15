const Product = require('../../models/Master/productMaster')

// update Product

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { } = req.body
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({
            message: "Product Updated Successfully",
            data: product,
            status: "success",
            success: true

        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
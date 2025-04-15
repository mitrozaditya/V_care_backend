const Product = require('../../models/Master/productMaster')

// delete Product
exports.delectProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({
            message: "Product Deleted Successfully",
            status: "success",
            success: true
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
}
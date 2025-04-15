const Product = require('../../models/Master/productMaster')

// get Product By Id

exports.getProductById =(req,res)=>{
    const {id}=req.params
    Product.findById(id)
    .then(product=>{
        res.status(200).json({
            message:"Product Found",
            data:product,
            status:"success",
            success:true
        })
    })
    .catch(error=>{
        res.status(500).json({message:error.message})
    })
}
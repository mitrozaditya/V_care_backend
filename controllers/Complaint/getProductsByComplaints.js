const Complaint = require('../../models/Complaint/complaint');
const Challan = require('../../models/Challan/challan');

exports.getProductsByComplaint = async (req, res) => {
    try {
        const {id}=req.params;
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // // Find challan linked to the complaint and fetch products
        const challan = await Challan.findById(id).populate('products');
        
        
        if (!challan) {
            return res.status(404).json({ message: 'No Products found for this complaint' });
        }

        res.status(200).json({ 
            status: "success",
            success: true,
            message: "products feteched successfully",
            
            products: challan.products 

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


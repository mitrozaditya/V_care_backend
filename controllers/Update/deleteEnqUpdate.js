const Update = require('../../models/Update/enquiryUpdate');

// Delete a specific update by ID
exports.deleteEnqUpdate = async (req, res) => {
    try {
        const {id}=req.params;
        const deletedUpdate = await Update.findByIdAndDelete(id);
        if (!deletedUpdate){
            return res.status(404).json({ error: 'update not found'});
        
        }

        res.status(200).json({
            success: true,
            status:"success",
            message: 'update deleted successfully',
        })
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
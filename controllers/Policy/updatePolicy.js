const Policy = require('../../models/Policy/policy');

// update Policy
exports.updatePolicy = async (req, res) => {
    try {
        const { id } = req.params
        const { } = req.body
        const policy = await Policy.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (!policy) { 
            return res.status(404).json({
                message: 'policy not found',
                status: 'error',
                success: false,
                error: 'policy not found'
            })
        }
        res.status(200).json({
            message: 'policy updated successfully',
            status: 'success',
            success: true,
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating policy',
            status: 'error',
            success: false,
            error: error.message

        })
    }
}
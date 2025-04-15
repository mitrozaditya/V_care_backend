const Policy = require('../../models/Policy/policy');

exports.addPolicy = async (req, res) => {
    try {
        const policy = new Policy(req.body);
        await policy.save();
        res.status(201).json({
            message: 'Policy added successfully',
            status: 'success',
            success: true,
            data: policy

        })
    }
    catch(error){
        res.status(500).json({
            message: 'Error adding policy',
            status: 'error',
            success: false,
            error: error.message
        })
    }
}
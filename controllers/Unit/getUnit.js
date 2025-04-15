const Unit = require('../../models/Unit/unit');

// get unit

exports.getUnit = async(req,res)=>{
    try{
        const units = await Unit.find();
        res.status(200).json({
            status: 'success',
            message: 'Units retrieved successfully',
            success: true,
            data: units
        })
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

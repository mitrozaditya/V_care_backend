const Unit = require('../../models/Unit/unit');
// add unit
exports.addUnit = async (req,res)=>{
    try{
        const {unit_name} = req.body;
        const newUnit = new Unit({
            unit_name
        });
        await newUnit.save();
        res.status(200).json({
            status: 'success',
            message: 'Unit added successfully',
            success: true,
            data: newUnit
        })

    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}
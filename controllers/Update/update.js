const Update = require('../../models/Update/enquiryUpdate');

// update enquiry update

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { } = req.body;

        const update = await Update.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) {
            return res.status(400).json({ message: 'Update not found' });
        }
        res.status(200).json({
            message:'update Successfully',
            success: true,
            status: 'sucess',
            data: update
        })


    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
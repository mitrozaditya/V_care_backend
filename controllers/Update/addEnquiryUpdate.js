const Update = require('../../models/Update/enquiryUpdate');

exports.addEnquiryUpdate = async (req, res) => {
    try {
        const { enquiry_id, update_note, follow_up_date, comment } = req.body;
        const newUpdate = new Update({
            enquiry_id,
            update_note,
            follow_up_date,
            comment
        });
        await newUpdate.save();
        res.status(201).json({
            suceeess: true,
            status:"success",
            message: 'Enquiry update added successfully',
            data: newUpdate
             });
    }
    catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

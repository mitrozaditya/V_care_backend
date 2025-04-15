const Enquiry = require('../../models/enquiry/enquiry');
const Counter = require('../../models/Counter/counter');

exports.addEnquiry = async (req, res) => {
    try {
        const {
            enquiry_for,
            date,
            assign_to,
            client_id,
            enquiry_description,
            // map_link
        } = req.body;

        // get the next sequence for enquiry
        const counter = await Counter.findOneAndUpdate(
            { name: 'enquiry' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        const year = new Date().getFullYear();
        const enquiry_id = `ENQ${year}${String(counter.seq).padStart(4, '0')}`;


        // Ensure required fields are present
        if (!client_id || !enquiry_for || !date || !assign_to || !enquiry_description) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // // Ensure `map_link` contains required properties
        // if (!map_link.title || !map_link.lat || !map_link.lng) {
        //     return res.status(400).json({ message: 'Invalid map_link format', success: false });
        // }

        // Create new enquiry
        const enquiry = new Enquiry({
            client_id,
            enquiry_for,
            date,
            assign_to,
            enquiry_description,
            enquiry_id,
            // map_link: {
            //     title: map_link.title,  // Added title
            //     lat: map_link.lat,
            //     lng: map_link.lng
            // }
        });

        await enquiry.save();
        res.status(201).json({
            message: 'Enquiry added successfully',
            status: "success",
            success: true,
            data: enquiry
        });

    } catch (error) {
        console.error('Error adding enquiry:', error.message); // Logs error message
        res.status(500).json({ 
            message: 'Server error',
             error: error.message 
            });
    }
};

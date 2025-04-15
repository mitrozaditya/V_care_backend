const Client = require('../../models/Master/clientMaster');

// update client
exports.updateClient = async (req, res) => {
    try {
        const { client_name, client_email, client_phone, client_company, client_address, location,mapLinks } = req.body;
        const { id } = req.params;
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        // Update client details

        await Client.findByIdAndUpdate(id, {
            client_name,
            client_email,
            client_phone,
            client_company,
            client_address,
            location,
            mapLinks,
        });
        res.status(200).json({ message: 'Client updated successfully', success: true, status: "success", data: client });
        



    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

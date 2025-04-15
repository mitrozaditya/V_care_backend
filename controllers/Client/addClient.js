const Client = require('../../models/Master/clientMaster');
exports.addClient = async (req, res) => {
    try {
        const { client_name, client_email, client_phone, client_company, client_address, mapLinks } = req.body;

        // Validate required fields
        if (!client_name || !client_email || !client_phone || !client_company || !client_address || !mapLinks) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Check for existing client
        const existingClient = await Client.findOne({ client_email });
        if (existingClient) {
            return res.status(400).json({ message: 'Client with this email already exists', success: false });
        }

        // Create new client
        const newClient = new Client({
            client_name,
            client_email,
            client_phone,
            client_company,
            client_address,
            mapLinks,
            isDeleted: false,
        });

        await newClient.save();
        res.status(201).json({ message: 'Client added successfully', success: true, status: "success", data: newClient });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

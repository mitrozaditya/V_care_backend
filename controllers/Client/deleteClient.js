const Client = require('../../models/Master/clientMaster');

// delete client
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
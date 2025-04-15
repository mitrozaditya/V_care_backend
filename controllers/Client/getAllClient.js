const Client = require('../../models/Master/clientMaster');
exports.getAllClient = async (req, res) => {
    try {
        // add search filter
        const { search, page = 0, limit = 0 } = req.query;
        const query = {};
        if (search) {
            query.client_name = { $regex: search, $options: 'i' };
        }

        let clients;
        let totalClients;
        const total_items = await Client.countDocuments();

        if (parseInt(page) === 0 && parseInt(limit) === 0) {
            // If page or limit is 0, return all records
            clients = await Client.find(query);
            totalClients = clients.length;
        } else {
            // Apply pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            clients = await Client.find(query)
                .skip(skip)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 })
            totalClients = await Client.countDocuments(query);
        }

        res.status(200).json({
            status: 'success',
            message: 'clients retrieved successfully',
            success: true,
            data: clients,
            pagination: parseInt(page) !== 0 && parseInt(limit) !== 0 ? {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalClients / parseInt(limit)),
                total_clients: totalClients
            } : null,
            summary: {
                total_items
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}
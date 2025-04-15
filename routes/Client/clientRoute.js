const express = require('express');
const { addClient } = require('../../controllers/Client/addClient');
const { getAllClient } = require('../../controllers/Client/getAllClient');
const { getClientById } = require('../../controllers/Client/getClientById');
const { deleteClient } = require('../../controllers/Client/deleteClient');
const { updateClient } = require('../../controllers/Client/updateClient');
const router = express.Router();

// add client
router.post('/add', addClient );

// get all clients

router.get('/get', getAllClient);

// get client by id
router.get('/get/:id', getClientById);

// delete client
router.delete('/delete/:id', deleteClient);

// update client
router.put('/update/:id', updateClient);

module.exports = router;
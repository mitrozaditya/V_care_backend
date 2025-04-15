const express = require('express');
const { createInvoice } = require('../../controllers/Invoice/createInvoice');
const getAllInvoice = require('../../controllers/Invoice/getAllInvoice');
const getInvoiceById = require('../../controllers/Invoice/getInvoiceById');
const { getAllInvoiceByEnquiry } = require('../../controllers/Invoice/getInvoiceByEnquiry');
const { updateInvoice } = require('../../controllers/Invoice/updateInvoice');
const router = express.Router();

// create invoice
router.post('/createInvoice', createInvoice);

// get invoice
router.get('/get', getAllInvoice);

// gget invoice by id
router.get('/get/:id', getInvoiceById);

// get invoice by enquiry id
router.get('/getEnquiry/:enquiry_id', getAllInvoiceByEnquiry);

// update invoice
router.put('/update/:id', updateInvoice);

module.exports = router;
const express = require('express');
const { addPayment } = require('../../controllers/Payment/addPayment');
const { getPaymentByInvoice } = require('../../controllers/Payment/getPaymentByInvoice');
const { getAllPayments } = require('../../controllers/Payment/getAllPayments');
const router = express.Router();



// add Payment
router.post('/addPayment', addPayment);

// get Payment by invoice_id
router.get('/getByInvoice/:invoice_id', getPaymentByInvoice);

// get All Payments
router.get('/getAll', getAllPayments);

module.exports = router;
const express = require('express');
const { addComplaint } = require('../../controllers/Complaint/addComplaint');
const { getComplaint } = require('../../controllers/Complaint/getComplaint');
const { getComplaintById } = require('../../controllers/Complaint/getComplaintById');
const { getProductsByComplaint } = require('../../controllers/Complaint/getProductsByComplaints');
const { getInvoiceByClient } = require('../../controllers/Complaint/getInvoiceByClient');
const { ComplaintOrder } = require('../../controllers/Complaint/Complaint_Order/complaintOrder');
const { complaintChallan } = require('../../controllers/Complaint/Complaint Challan/complaintChallan');
// const { getComplaintByOrder } = require('../../controllers/Complaint/GetComplaintBy/getComplaintbyOrder');
const { getComplaintByChallan } = require('../../controllers/Complaint/GetComplaintBy/getComplaintByChallan');
const { getComplaintByInvoice } = require('../../controllers/Complaint/GetComplaintBy/getComplaintByInvoice');
const { getComplaintByOrder } = require('../../controllers/Complaint/GetComplaintBy/getComplaintbyOrder');
const router = express.Router();



// add complaint
router.post('/add', addComplaint)

// get complaint
router.get('/get', getComplaint)

// get complaint by id
router.get('/get/:id', getComplaintById)

// get products by complaint id
router.get('/getProducts/:id', getProductsByComplaint)

// get complaint by client id and invoice data
router.get('/getByClient/:client_id', getInvoiceByClient)

// comlaint order
router.post('/complaintOrder', ComplaintOrder)

// create challan by Complaint_order
router.post('/complaintChallan', complaintChallan)



// get order by Complaint id
router.get('/getComplaintByOrder/:id',getComplaintByOrder )

// get Challan by complaint id
router.get('/getComplaintByChallan/:id', getComplaintByChallan)

// get invoice by complaint id
router.get('/getComplaintByInvoice/:id', getComplaintByInvoice)

module.exports = router;

const express = require('express');
const { addOrder } = require('../../controllers/Order/addOrder');
const { getOrder } = require('../../controllers/Order/getOrder');
const { getOrderById } = require('../../controllers/Order/getOrderById');
const { getOrderByEnquiry } = require('../../controllers/Order/getOrderByEnquiry');
const router = express.Router();


// add Order
router.post('/addOrder', addOrder);

// get All order
router.get('/getOrder', getOrder);

// get order by id
router.get('/getOrderById/:id', getOrderById);

// get order by enquiry id
router.get('/getOrderByEnquiry/:id', getOrderByEnquiry);

module.exports = router;

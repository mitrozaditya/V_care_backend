const express = require('express');
const { addEnquiry } = require('../../controllers/Enquiry/addEnquiry');
const { assignEnquiry } = require('../../controllers/Enquiry/assignEnquiry');
const { getEnquiry } = require('../../controllers/Enquiry/getEnquiry');
const { getEnquiryById } = require('../../controllers/Enquiry/getEnquiryById');
const { updateEnquiry } = require('../../controllers/Enquiry/updatEnquiry');
const router = express.Router();

// add enquiry
router.post('/addEnquiry', addEnquiry);

// assign enquiry
router.post('/assignEnquiry', assignEnquiry);

//  get enquiry
router.get('/getEnquiry',getEnquiry );

// get enquiry by id
router.get('/getEnquiryById/:id',getEnquiryById );

// update enquiry
router.put('/updateEnquiry/:id', updateEnquiry);

module.exports = router;



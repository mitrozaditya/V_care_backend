const express = require('express');
const { addEnquiryUpdate } = require('../../controllers/Update/addEnquiryUpdate');
const { getEnquiryUpdate } = require('../../controllers/Update/getEnquiryUpdate');
const { deleteEnqUpdate } = require('../../controllers/Update/deleteEnqUpdate');
const { update } = require('../../controllers/Update/update');
const router = express.Router();


// add Enquiry Update
router.post('/addEnquiryUpdate', addEnquiryUpdate);

// get Enquiry Update
router.get('/getEnquiryUpdate/:enquiryId', getEnquiryUpdate);

// delete Enquiry Update
router.delete('/deleteEnquiryUpdate/:id', deleteEnqUpdate);

// edit Enquiry Update
router.put('/update/:id', update)

module.exports = router;
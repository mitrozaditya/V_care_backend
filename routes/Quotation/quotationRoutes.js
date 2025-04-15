const express = require('express');
const { createquotation } = require('../../controllers/Quotation/createQuotation');
const { getquotation } = require('../../controllers/Quotation/getQuotation');
const { deletequotation } = require('../../controllers/Quotation/deleteQuotation');
const { getQuotationByEnquiry } = require('../../controllers/Quotation/getQuotationByEnquiry');
const { updateQuotation } = require('../../controllers/Quotation/updateQuotation');
const router = express.Router();

// add quotation
router.post('/create', createquotation);

// get quotation
router.get('/get', getquotation);

// update quotation
router.put('/update/:id', updateQuotation);

// delete quotation
router.delete('/delete/:id', deletequotation)

// get Quotation by enquiry id
router.get('/getEnquiry/:id', getQuotationByEnquiry);


module.exports = router;
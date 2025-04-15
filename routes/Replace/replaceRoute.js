const express = require('express');
const { getAllReplaceProduct } = require('../../controllers/ReplaceProduct/getAllReplaceProduct');
const { getReplaceProductById } = require('../../controllers/ReplaceProduct/getReplaceProductById');
const { addReplaceProduct } = require('../../controllers/ReplaceProduct/addReplaceProduct');
const { updateMany } = require('../../models/Replace/replace');
const { updateReplaceProduct } = require('../../controllers/ReplaceProduct/updateReplaceProduct');
const router = express.Router();

// get Replace product List
router.get('/getAllReplaceProduct', getAllReplaceProduct);

// get Replace product by id
router.get('/getReplaceProductBy/:id', getReplaceProductById)

// add Replace product
router.post('/addReplaceProduct', addReplaceProduct);


// update Replace product
router.put('/updateReplaceProduct/:id', updateReplaceProduct);

module.exports = router;
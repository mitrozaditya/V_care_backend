const express = require('express');
const { addCategory } = require('../../controllers/Category/addCategory');
const { getCategoryById } = require('../../controllers/Category/getcategory');
const { getAllCategory } = require('../../controllers/Category/getAllCategory');
const { deleteCategory } = require('../../controllers/Category/deleteCategory');
const { updateMany } = require('../../models/Challan/challan');
const { updateCategory } = require('../../controllers/Category/updateCategory');
const router = express.Router();

// add category
router.post('/addCategory', addCategory);

// get gategory by id
router.get('/by/:id', getCategoryById);

// get all category
router.get('/get', getAllCategory);

// delete category
router.delete('/deleteCategory/:id', deleteCategory)

// update category
router.put('/updateCategory/:id', updateCategory);

module.exports = router;
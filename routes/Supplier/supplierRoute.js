const express = require('express');
const { addSupplier } = require('../../controllers/Supplier/addSuplier');
const { getSupplier } = require('../../controllers/Supplier/getSupplier');
const { getSupplierById } = require('../../controllers/Supplier/getSupplierById');
const { updateSupplier } = require('../../controllers/Supplier/updateSupplier');
const { deleteSupplier } = require('../../controllers/Supplier/deleteSupplier');
const router = express.Router();


// add Supplier
router.post('/add', addSupplier);

// get all Supplier
router.get('/get', getSupplier);

// get Supplier by id
router.get('/by/:id', getSupplierById);

// // update Supplier
router.put('/update/:id', updateSupplier);

// // delete Supplier
router.delete('/delete/:id', deleteSupplier);

module.exports = router;
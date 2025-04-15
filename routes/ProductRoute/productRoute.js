const express = require('express');
const router = express.Router();
const { addProduct } = require('../../controllers/Products/addProduct');
const { getAllProduct } = require('../../controllers/Products/getAllProduct');
const { addUnit } = require('../../controllers/Unit/addUnit');
const { getUnit } = require('../../controllers/Unit/getUnit');
const { delectProduct } = require('../../controllers/Products/delectProduct');
const { updateProduct } = require('../../controllers/Products/updateProduct');
const { getProductWithoutBarcode } = require('../../controllers/Products/getProduct_withoutBarcode');

// add product
router.post('/addProduct', addProduct);

// get all products
router.get('/product-list', getAllProduct);

// delete product
router.delete('/deleteProduct/:id', delectProduct);

// update product
router.put('/updateProduct/:id', updateProduct);


// unit Routes
router.post('/addUnit', addUnit);
router.get('/unit-list', getUnit);

// get product without barcode
router.get('/product-without-barcode', getProductWithoutBarcode);



module.exports = router;
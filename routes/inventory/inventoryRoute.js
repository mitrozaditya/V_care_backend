const  express = require('express');
const router = express.Router();
const { addInventory } = require('../../controllers/Inventory/addInventory');
const { getInventory } = require('../../controllers/Inventory/getInventory');
const { updateInventory } = require('../../controllers/Inventory/updateInventory');
const { getInventoryByBarcode } = require('../../controllers/Inventory/getByProduct_barcode');
const { deleteInventory } = require('../../controllers/Inventory/deleteInventory');




// add Inventory
router.post('/addInventory', addInventory);

// get Inventory 
router.get('/getInventory', getInventory);

// update Inventory
router.put('/updateInventory/:id', updateInventory);

// get Inventory by barcode
router.get('/ByBarcode/:product_barcode', getInventoryByBarcode);

// delete Inventory
router.delete('/deleteInventory/:id', deleteInventory);

module.exports = router;
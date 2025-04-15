
const Inventory = require('../../models/inventory/inventory');

exports.getInventoryByBarcode = async (req, res) => {
  const { product_barcode } = req.params;

  try {
    const inventory = await Inventory.findOne({ product_barcode })
      .populate({
        path: 'product_id',

      })
      .exec();

    // if (!inventory) {
    //   return res.status(404).json({ message: 'Inventory not fd' });
    // }
    // res.status(200).json(inventory);
    if (inventory) {
      res.status(200).json({
        product_barcode: inventory.product_barcode,
        purchased_price: inventory.purchased_price,
        status: inventory.status,
        product_name: inventory.product_id.product_name,
        unit: inventory.product_id.unit,
        product_id: inventory.product_id._id,
      });
    } else {
      return res.status(200).json({ message: 'Product not found', success: false, status: 'error' });
    }


  } catch (error) {
    res.status(500).json({
      message: 'Server error', error
    });
  }
};
const ComplaintOrder = require('../../../models/Order/complaintOrder');

const Complaint = require('../../../models/Complaint/complaint');


exports.ComplaintOrder = async (req, res) => {
  try {
    const { complaint_id, order_items,assign_to } = req.body;

    // Debug logs
    // console.log('Received complaint_id:', complaint_id);
    // console.log('Received order_items:', order_items);

    if (!complaint_id || !Array.isArray(order_items) || order_items.length === 0) {
      return res.status(400).json({
        message: 'Complaint ID and order items are required',
        success: false,
        status: 'error'
      });
    }

    const complaint = await Complaint.findById(complaint_id);
    if (!complaint) {
      return res.status(404).json({
        message: 'Complaint not found',
        success: false,
        status: 'error'
      });
    }

    const newOrder = new ComplaintOrder({
      complaint_id: complaint._id,
      client_id: complaint.client_id,
      order_status: 'pending',
      order_items: order_items,  // <- explicitly set
      assign_to: assign_to
    });

    await newOrder.save();

 

  res.status(201).json({
    message: 'Order Created Successfully',
    sucess: true,
    status: 'success',
    data:newOrder
  })
}
catch (error) {
  res.status(500).json({
    message: 'Error creating order',
    success: false,
    status:'error',
    error: error.message
  })
}

};


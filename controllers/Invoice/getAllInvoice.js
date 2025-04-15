const mongoose = require('mongoose');
const Invoice = require('../../models/Invoice/invoiceMaster');
const Client = require('../../models/Master/clientMaster');
const Enquiry = require('../../models/enquiry/enquiry');

const getAllInvoice = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};

    // Convert page & limit to numbers before using them
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    if (search) {
      let searchConditions = [];

      // 🔹 Search by Invoice ID (if valid ObjectId)
      if (mongoose.Types.ObjectId.isValid(search)) {
        searchConditions.push({ _id: new mongoose.Types.ObjectId(search) });
      }

      // 🔹 Search by Client Name or Phone
      const clientFilter = {
        $or: [
          { client_name: { $regex: search, $options: 'i' } },
          { client_phone: { $regex: search, $options: 'i' } },
        ],
      };

      const clients = await Client.find(clientFilter).select('_id');

      if (clients.length > 0) {
        const clientIds = clients.map(client => client._id);

        // 🔹 Find matching enquiries for these clients
        const enquiries = await Enquiry.find({ client_id: { $in: clientIds } }).select('_id');

        if (enquiries.length > 0) {
          const enquiryIds = enquiries.map(enquiry => enquiry._id);
          searchConditions.push({ enquiry_id: { $in: enquiryIds } });
        }
      }

      if (searchConditions.length > 0) {
        query.$or = searchConditions;
      }
    }

    // if (search) {
    //   const searchConditions = [];

    //   // Search by Invoice ID (if valid ObjectId)
    //   if (mongoose.Types.ObjectId.isValid(search)) {
    //     searchConditions.push({ _id: new mongoose.Types.ObjectId(search) });
    //   }

    //   // Search by Client Name or Client Phone (Using `lookup` instead of direct query)
    //   searchConditions.push(
    //     { client_name: { $regex: search, $options: 'i' } },
    //     { client_phone: { $regex: search, $options: 'i' } }
    //   );

    //   query.$or = searchConditions;
    // }

    // 🔹 Get total count of invoices (with search applied)
    const totalInvoices = await Invoice.countDocuments(query);



    // Fetch paginated invoices
    const invoices = await Invoice.find(query)
      .populate({
        path: 'enquiry_id',
        select: 'client_id',
        populate: {
          path: 'client_id',
          select: 'client_name client_email client_phone client_address',
        }
      })


      .populate('challan_id')
      .populate('invoice_items.product_id', 'product_name')
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 })
    // .populate('challan_id')

    // 🔹 Count "paid" and "pending" statuses
    const paidCount = await Invoice.countDocuments({
      ...query,
      payment_status: 'paid',
    });

    const pendingCount = await Invoice.countDocuments({
      ...query,
      payment_status: 'pending',
    });

    total_payments = await Invoice.countDocuments();
    res.status(200).json({
      data: invoices,
      pagination: {

        current_page: pageNumber,
        total_pages: Math.ceil(totalInvoices / limitNumber),
        total_records: totalInvoices,
      },
      summary: {
        total_payments,
        complete: paidCount,
        pending: pendingCount,
      }

    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = getAllInvoice;


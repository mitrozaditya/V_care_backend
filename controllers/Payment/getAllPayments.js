const Payment = require('../../models/Payment/payment');
const mongoose = require('mongoose');

// get all payments with search filter
exports.getAllPayments = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;


        const query = {};
        // If search exists, apply filters
        if (search) {
            const searchConditions = [];

            // Convert search term to ObjectId if valid
            if (mongoose.Types.ObjectId.isValid(search)) {
                searchConditions.push({ invoice_id: new mongoose.Types.ObjectId(search) });
            }

            // Use regex search for payment_mode (string field)
            searchConditions.push({ payment_mode: { $regex: search, $options: "i" } });

            query.$or = searchConditions;
        }



        // Convert page & limit to numbers and apply pagination
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch total count
        const totalRecords = Object.keys(query).length
            ? await Payment.countDocuments(query)
            : await Payment.estimatedDocumentCount(); // Faster for large collections


        // Fetch payments based on query
        const payments = await Payment.find(query)
            // i want to populate enquiry_id

            .populate({
                path: "invoice_id",   
                populate: {
                    path: "enquiry_id", 
                    model: "Enquiry",   
                    select: "client_id",
                    populate: {
                        path: "client_id",  
                        model: "clientMaster"     
                    }
                }
            })
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 }); 

        // **Summary Data**
        const total_payments = await Payment.countDocuments();
        const complete_payment = await Payment.countDocuments({ payment_status: "paid" });
        const pending_payment = await Payment.countDocuments({ payment_status: "pending" });

        res.status(200).json({
            status: "success",
            message: "All Payments fetched successfully",
            total_records: payments.length, 
            data: payments,
            pagination: {
                total_records: totalRecords,
                current_page: pageNumber,
                total_pages: Math.ceil(totalRecords / limitNumber),
            },
            summary: {
                total_payments,
                complete_payment,
                // pending_payment
            }
        });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};

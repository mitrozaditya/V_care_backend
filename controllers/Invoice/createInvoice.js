const mongoose = require('mongoose');
const Invoice = require('../../models/Invoice/invoiceMaster');
const Challan = require('../../models/Challan/challan');
const Enquiry = require('../../models/enquiry/enquiry');
const Counter = require('../../models/Counter/counter');

// create Api for Invoice.createInvoice    


exports.createInvoice = async (req, res) => {
    try {
        const { challan_id, enquiry_id, complaint_id, discount, discount_amount, net_amount, taxable_amount, invoice_items, total_amount } = req.body;

        // get the next sequence for quotation
        const counter = await Counter.findOneAndUpdate(
            { name: 'invoice' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const year = new Date().getFullYear();
        const invoice_id = `INV${year}${String(counter.seq).padStart(4, '0')}`;



        if (!enquiry_id && !complaint_id) {
            return res.status(400).json({
                message: "Either enquiry_id or complaint_id is required",
                success: false,
                status: "error"
            });
        }

        const invoice = new Invoice({
            challan_id,
            enquiry_id,
            complaint_id,
            discount,
            discount_amount,
            net_amount,
            total_amount,
            taxable_amount,
            invoice_items,
            remaining_amount: net_amount,
            invoice_id
        });
        await invoice.save();
        // Update enquiry status in one query
        await Enquiry.findOneAndUpdate(
            { _id: enquiry_id },
            { status: "invoice_created" },
            { new: true }
        );




        res.status(201).json({
            message: "Invoice created successfully",
            success: true,
            status: "success",
            data: invoice
        });


    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            status: "error"
        });
    }
}











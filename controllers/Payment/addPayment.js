const Payment = require('../../models/Payment/payment');
const Invoice = require('../../models/Invoice/invoiceMaster');

// add payment with invoice id

exports.addPayment = async (req, res) => {
    try {
        const { invoice_id, payment_mode, payment_date, received_amount = 0 } = req.body;

        // Find the invoice
        const invoiceData = await Invoice.findById(invoice_id)
            // .populate('challan_id');
            .populate({
                path: 'challan_id', // First, populate challan_id from Invoice
                populate: {
                    path: 'products', // Then, populate products inside Challan
                    populate: {
                        path: 'product_id',
                        model: 'Product_Master', // Ensure this matches the actual model name
                        select: 'product_name unit_price unit waranty_period'
                    }
                }
            })




        if (!invoiceData) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        if (!invoiceData.challan_id || !invoiceData.net_amount) {
            return res.status(400).json({ message: "Total amount not found in challan" });
        }

        const netAmount = invoiceData.net_amount;

        // **Retrieve all previous payments for this invoice and sum received_amount**
        const previousPayments = await Payment.find({ invoice_id });
        const totalReceived = previousPayments.reduce((sum, payment) => sum + payment.received_amount, 0);

        // **Calculate new remaining amount**
        const newTotalReceived = totalReceived + received_amount;
        const remainingAmount = netAmount - newTotalReceived;

        // // Calculate remaining amount
        // const netAmount = invoiceData.net_amount;
        // const remainingAmount = netAmount - received_amount;
        if (remainingAmount < 0 && invoiceData.payment_status === 'paid') {
            return res.status(400).json({ message: "Payment alerady paid" });
        }
        else if (remainingAmount < 0) {
            return res.status(400).json({ message: "Payment amount exceeds remaining amount" });
        }


        // **Determine Payment Status**
        const payment_status = remainingAmount === 0 ? 'paid' : 'pending';

        // **Create and save the new payment**
        const payment = new Payment({
            invoice_id: invoiceData._id,
            payment_mode,
            payment_date,
            net_amount: netAmount,
            received_amount,
            remaining_amount: remainingAmount,
            payment_status
        });
        await payment.save();
        res.status(201).json({
            message: "Payment Received ",
            success: true,
            status: "success",
            data: payment
        });


        // Update Invoice Data: Update paid_amount, remaining_amount, and payment_status
        await Invoice.findByIdAndUpdate(invoice_id, {
            received_amount: newTotalReceived,  // Update the total received amount in Invoice
            remaining_amount: remainingAmount, // Update remaining amount
            payment_status: payment_status     // Update payment status to either 'paid' or 'pending'
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
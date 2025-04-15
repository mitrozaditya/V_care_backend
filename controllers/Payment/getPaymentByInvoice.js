const Payment = require('../../models/Payment/payment');
const Invoice = require('../../models/Invoice/invoiceMaster');

exports.getPaymentByInvoice = async (req, res) => {
    try {
        const { invoice_id } = req.params;

        // Fetch the invoice to get the total amount
        const invoice = await Invoice.findById(invoice_id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        const totalAmount = invoice.total_amount; // ✅ Total invoice amount

        // Fetch all payments related to this invoice
        const payments = await Payment.find({ invoice_id });

        // Calculate total paid amount
        const totalPaid = payments.reduce((sum, payment) => sum + payment.received_amount, 0);

        // Calculate remaining amount
        const remainingAmount = totalAmount - totalPaid;

        res.status(200).json({
            status: "success",
            success: true,
            message: "Payment summary fetched successfully",
            summary: {
                total_amount: totalAmount,
                total_paid: totalPaid,
                remaining_amount: remainingAmount
            },
            payments: payments // Optional: return all payments if needed
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
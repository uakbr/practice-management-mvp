const Invoice = require('../models/invoiceModel');
const stripe = require('../config/stripeConfig');

// Generate an invoice
const generateInvoice = async (req, res) => {
  const { appointmentId, amountDue, dueDate } = req.body;
  try {
    const invoice = new Invoice({
      userId: req.user.userId,
      appointmentId,
      amountDue,
      dueDate,
    });
    await invoice.save();
    res.status(201).json({ message: 'Invoice generated successfully', invoice });
  } catch (error) {
    console.error('Generate Invoice Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's invoices
const getUserInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.userId }).sort({ invoiceDate: -1 });
    res.json(invoices);
  } catch (error) {
    console.error('Get Invoices Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Process payment
const processPayment = async (req, res) => {
  const { invoiceId, paymentMethodId } = req.body;
  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice || invoice.userId.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    if (invoice.status === 'paid') {
      return res.status(400).json({ message: 'Invoice already paid' });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(invoice.amountDue * 100), // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Update invoice status
    invoice.amountPaid = invoice.amountDue;
    invoice.status = 'paid';
    await invoice.save();

    res.json({ message: 'Payment processed successfully', invoice });
  } catch (error) {
    console.error('Process Payment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  generateInvoice,
  getUserInvoices,
  processPayment,
};
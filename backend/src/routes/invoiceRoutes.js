const express = require('express');
const router = express.Router();
const {
  generateInvoice,
  getUserInvoices,
  processPayment,
} = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// @route   POST /api/invoices
// @desc    Generate an invoice
router.post('/', generateInvoice);

// @route   GET /api/invoices
// @desc    Get user's invoices
router.get('/', getUserInvoices);

// @route   POST /api/invoices/pay
// @desc    Process payment for an invoice
router.post('/pay', processPayment);

module.exports = router;
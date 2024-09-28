const stripe = require('../config/stripeConfig');

const processStripePayment = async (amount, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  processStripePayment,
};
// Payment Controller for handling transactions
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { amount, source } = req.body;
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: source,
      description: 'Payment for stable booking'
    });

    res.status(200).json({ success: true, charge });
  } catch (error) {
    res.status(500).send('Payment processing failed.');
  }
};

const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Order = require('../models/Order')
const RazorpayConfig = {
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
}
router.post('/payment-response', async (req, res) => {
  const { payment_id, order_id, signature } = req.body;
  // Verify the signature and update your database or perform other actions
  try {
    await Order.create({
      email: req.body.email,
      date: req.body.order_date,
      details: req.body.order_data,
      totalPrice: req.body.total_price,
    })

  } catch (error) {
    console.error(error);
    res.send('Server Error in Order Data')
  }


  res.json({ success: true });
})
const razorpay = new Razorpay(RazorpayConfig);
router.post('/payment', async (req, res) => {
  const options = {
    amount: req.body.total_price * 100, // Amount in paise (100 paise = 1 INR)
    currency: 'INR',
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order)
  } catch (error) {
    if (error.statusCode == '429') {
      res.status(429).send('Too many requests')
    } else {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
})
module.exports = router
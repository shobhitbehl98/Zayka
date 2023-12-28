const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const RazorpayConfig = {
    key_id: 'rzp_test_qmlqkzH0IhOcvY',
    key_secret: '4S2er13vTahuhK0Q5sbzliYS',
  }
const razorpay = new Razorpay(RazorpayConfig);
router.post('/payment',async(req,res)=>{
    const options = {
        amount: req.body.total_price*100, // Amount in paise (100 paise = 1 INR)
        currency: 'INR',
      };
      try {
        const order = await razorpay.orders.create(options);
        res.json(order)
      } catch (error) {
        if(error.statusCode=='429'){
          res.status(429).send('Too many requests')
        }else{
        console.error(error);
        res.status(500).send('Internal Server Error');
        }
      }
})
module.exports = router
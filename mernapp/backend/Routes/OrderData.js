const express = require('express');
const Order = require('../models/Order');
const redisClient = require('../redis')
const router = express.Router();
router.post('/payment-response',async(req,res)=>{
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
// router.post('/orderData', async (req, res) => {
   
// })
router.post('/getmyorders', async (req, res) => {
    try {
        const orders = await Order.find({ email: req.body.email })
        const data={ data: orders }
        res.json(data);
        redisClient.setEx(req.originalUrl, 3600, JSON.stringify(data));
    } catch (error) {
        console.error(error);
        res.send('Server Error')
    }
})


module.exports = router
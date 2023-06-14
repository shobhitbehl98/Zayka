const express = require('express');
const Order = require('../models/Order');
const router = express.Router();


router.post('/orderData', async (req, res) => {
    try {
        await Order.create({
            email: req.body.email,
            date: req.body.order_date,
            details: req.body.order_data
        })

        res.json({ success: true })
    } catch (error) {
        console.error(error);
        res.send('Server Error')
    }
})
router.post('/getmyorders', async (req, res) => {
    try {
        const orders=await Order.find({email:req.body.email})
        res.json({ data: orders });
    } catch (error) {
        console.error(error);
        res.send('Server Error')
    }
})


module.exports = router
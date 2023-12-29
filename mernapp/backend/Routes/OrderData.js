const express = require('express');
const Order = require('../models/Order');
const redisClient = require('../redis')
const router = express.Router();
router.post('/getmyorders', async (req, res) => {
    try {
        const orders = await Order.find({ email: req.body.email })
        const data={ data: orders }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.send('Server Error')
    }
})


module.exports = router
const express = require('express');
const Order = require('../models/Order');
const redisClient = require('../redis')
const router = express.Router();
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
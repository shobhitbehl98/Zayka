const express = require('express');
const router = express.Router();
const Food = require('../models/Food')
const redisClient = require('../redis');
const Category = require('../models/Category')

router.post('/foodData',async(req,res)=>{
    try {
       const food = await Food.find({});
       const categories = await Category.find({});
       console.log(!!food,!!categories);
       const data=[food,categories];
       res.send(data)
       redisClient.setEx(req.originalUrl, 3600, JSON.stringify(data));
    } catch (error) {
        console.error(error);
        res.send('Server Error')
    }
})


module.exports = router
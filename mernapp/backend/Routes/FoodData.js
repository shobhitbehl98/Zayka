const express = require('express');
const router = express.Router();
const Food = require('../models/Food')
const Category = require('../models/Category')

router.post('/foodData',async(req,res)=>{
    try {
       const food = await Food.find({});
       const categories = await Category.find({});
       console.log(!!food,!!categories);
       res.send([food,categories])
    } catch (error) {
        console.error(error);
        res.send('Server Error')
    }
})


module.exports = router
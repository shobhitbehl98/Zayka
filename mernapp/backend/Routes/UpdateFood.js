const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const Category = require('../models/Category')
router.post("/addFood"
    , async (req, res) => {
        try {
            await Food.create({
                name:req.body.name,
                CategoryName:req.body.categoryName,
                Veg:req.body.veg,
                options:req.body.options,
                description:req.body.description,
                img:req.body.image

            })
            res.json({"success":true})
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
            
        }
        
    });
router.post("/addCategory"
    , async (req, res) => {
        try {
           
            await Category.create({
               CategoryName : req.body.CategoryName
            })
            res.json({"success":true})
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
            
        }
    
    });
router.post("/updateFood"
    , async (req, res) => {
        try {
            await Food.updateOne({
                name:req.body.name,
            },{img:req.body.image})
            res.json({"success":true})
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
            
        }
        
    });

router.post("/updateFood",async(req,res)=>{
    try {
        await mongodb(req)
        res.send("success")
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;
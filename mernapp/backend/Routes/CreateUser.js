const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret='ilasfsgamskadqknakosnaklsnaklnko'
router.post("/createUser", [
    body('email').isEmail(),
    body('name').isLength({ min: 1 }).isAlpha(),
    body('lastName').isAlpha(),
    body('password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                lastName: req.body.lastName,
                location: req.body.location,
                email: req.body.email,
                password: secPass
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });
router.post("/updateLocation",async(req,res)=>{
    const { location, email } = req.body;
    console.log(location,email);
    try {
      const result = await User.updateMany(
        // Specify the condition to match the documents to be updated
        { email:email },
        // Specify the updates to be applied
        { $set: { location } }
      );
      if (result.modifiedCount > 0) {
        res.json({ message: 'Users updated successfully' });
      } else {
        res.status(404).json({ message: 'No users found to update' });
      }
   }catch(e){
    console.log(e)
   }
})
router.post("/login", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData) {
                res.status(400).json({ error: "No user found" });
            } 
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                res.status(400).json({ error: "Enter Correct Password" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret);
            res.json({ success: true,authToken:authToken,location:userData.location });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

module.exports = router;
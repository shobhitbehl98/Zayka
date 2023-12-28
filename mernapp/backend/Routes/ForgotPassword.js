const express = require('express');
const router = express.Router();
const User = require('../models/User')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const generateToken = () => {
    return uuid.v4();
  };

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shobhitbehl98@gmail.com', // replace with your email
      pass: `xivi fjua xpkq hwaw` // replace with your email password or an app-specific password
    }  
});
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Find user by email (replace with your actual database query)
    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate and store a reset token
    const resetToken = generateToken();
    user.resetToken = resetToken;
    console.log(user.resetToken,user)
    // Send password reset email
    const mailOptions = {
        from: 'shobhitbehl98@gmail.com', // replace with your email
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${process.env.FRONTEND}/resetpassword/${resetToken}`
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: 'Failed to send reset email' });
        }
        try {
            await user.save();
            console.log('resetToken updated and saved to the database');
          } catch (error) {
            console.error(error);
          }
        return res.json({ message: 'Reset email sent successfully' });
    });
});

router.post('/reset-password', async(req, res) => {
    const { email, token, newPassword } = req.body;

    // Find user by email and token (replace with your actual database query)
    const user = await User.findOne({resetToken: token});

    if (!user) {
        return res.status(404).json({ message: 'Invalid token' });
    }

    // Update the user's password and clear the reset token
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;

    try {
        await user.save();
        console.log('resetToken updated and saved to the database');
      } catch (error) {
        console.error(error);
      }

    return res.json({ message: 'Password reset successful' ,status:res.statusCode});
});
module.exports=router;
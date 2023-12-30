const express = require('express')
const Razorpay = require('razorpay');
// const redisClient = require('./redis');
// const cacheMiddleware = require('./cacheMiddleware');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const rateLimit = require('express-rate-limit')
const port = 5000
const mongodb=require('./db');
const cacheMiddleware = require('./cacheMiddleware');
mongodb();
app.use(cors())
app.options('*',cors())
app.use(bodyParser.json());
app.use(express.json())
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",process.env.FRONTEND);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept"
  );
  next();
})
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',cacheMiddleware,require('./Routes/FoodData'))
app.use('/api',require('./Routes/UpdateFood'))
app.use('/api',require('./Routes/OrderData'))
app.use('/api',require('./Routes/Payment'))
app.use('/api',require('./Routes/ForgotPassword'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports=app;
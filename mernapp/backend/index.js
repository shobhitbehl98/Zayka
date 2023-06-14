const express = require('express')
const app = express()
const port = 5000
const mongodb=require('./db');
mongodb();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept"
  );
  next();
})
app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/FoodData'))
app.use('/api',require('./Routes/UpdateFood'))
app.use('/api',require('./Routes/OrderData'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
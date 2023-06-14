const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shobhitbehl98:shobhitbehl98password@cluster0.yd5p958.mongodb.net/foodApp?retryWrites=true&w=majority'
const mongodb = async()=>{
    try{
    const connect=await mongoose.connect(mongoURI);
    if(connect){
        console.log("Connection Successful");
        const fetched_data=await connect.connection.db.collection('food_items');
        try{
        const data=await fetched_data.find({}).toArray();
        const cat_fetch_Data = await connect.connection.db.collection('food_category');
        const catData =await cat_fetch_Data.find({}).toArray();
        if(data){
        global.food_items=data;
        if(catData){
        global.food_category=catData;
        }else{
            console.log('no food category');
        }
        }else{
            console.log('no food item');
        }
    
        }catch(e){
            console.log(e.message);
        }
    }
    }
    catch(error){
        console.log("Error while connecting",error.message)
    }


}
module.exports=mongodb;

const mongoose = require('mongoose');
const {Schema} = mongoose;
const FoodCategorySchema=new Schema({
    CategoryName:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('food_category',FoodCategorySchema,this.collection='food_category');
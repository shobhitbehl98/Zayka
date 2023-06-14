const mongoose = require('mongoose');
const {Schema} = mongoose;

const FoodSchema=new Schema({
    CategoryName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    Veg:{
        type:Boolean,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    options:{
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})


module.exports=mongoose.model('food_items',FoodSchema);
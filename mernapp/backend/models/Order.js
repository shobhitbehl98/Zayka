const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    details: {
        type: Object,
        required: true
    }
})


module.exports = mongoose.model('Order', OrderSchema);
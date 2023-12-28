const mongoose = require('mongoose');
const logger = require('./logger');
const mongoURI = 'mongodb+srv://shobhitbehl98:shobhitbehl98password@cluster0.yd5p958.mongodb.net/foodApp?retryWrites=true&w=majority'
const mongodb = async () => {
    try {
        const connect = await mongoose.connect(mongoURI);
        if (connect) {
            logger.info('Connection Successful');
            console.log("Connection Successful");
        }
    }
    catch (error) {
        console.log("Error while connecting", error.message)
    }


}
module.exports = mongodb;

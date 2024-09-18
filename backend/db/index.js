const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/test")
        console.log(`MongoDB is connected, host is: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`MongoDB error ${error}`);
        process.exit(1)
    }
}

module.exports = connectDB;
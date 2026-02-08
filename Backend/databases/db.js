const mongoose = require('mongoose');

const connectDb = async () => {
    try {
       await mongoose.connect(process.env.DB_CONNECTION); 
       console.log("db Connected");
    } catch (error) {
        console.error(`Database not connected , Reason: ${error}`);
        process.exit(1);
    }
}

module.exports = connectDb;
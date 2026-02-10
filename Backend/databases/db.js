const dns = require("dns").promises;

// Force Node.js to use reliable public DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare + Google

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
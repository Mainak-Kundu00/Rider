const env = require('dotenv');
env.config();

const connectDb = require('./databases/db');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors(process.env.CORS_ORIGIN)); 

connectDb();

app.get('/',(req,res) => {
    res.send('Hello World');
});

module.exports = app;
const env = require('dotenv');
env.config();

const connectDb = require('./databases/db');
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(cors(process.env.CORS_ORIGIN)); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDb();

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.use('/users',userRoute);

module.exports = app;
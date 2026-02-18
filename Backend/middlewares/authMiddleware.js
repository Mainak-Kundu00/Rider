const userModel = require('../models/user.model');
const captainModel = require('../models/captainModel');
const Blacklist = require('../models/blackListModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.authUser = async (req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    
    if(!token){
      return res.status(401).json({message: "Unauthorized access !!!"});
    }

    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
        return res.status(401).json({ message: "Unauthorized access !!!" });
    }

    try {
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decode);

        req.user = user;
        return next();

    } catch (error) {
        console.error(`Auth Error: ${error}`);
      return res.status(401).json({message: "Unauthorized access !!!"});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await Blacklist.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}
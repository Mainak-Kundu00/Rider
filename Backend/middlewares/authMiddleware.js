const userModel = require('../models/user.model');
const Blacklist = require('../models/blackListModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.authUser = async (req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    
    if(!token){
      return res.status(401).json({message: "Unauthorized acess !!!"});
    }

    const blacklisted = await Blacklist.findOne({ token });
    if (blacklisted) {
        return res.status(401).json({ message: "Unauthorized acess !!!" });
    }

    try {
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decode);

        req.user = user;
        return next();

    } catch (error) {
        console.error(`Auth Error: ${error}`);
      return res.status(401).json({message: "Unauthorized acess !!!"});
    }
}
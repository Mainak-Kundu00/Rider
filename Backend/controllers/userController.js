const userModel = require('../models/user.model');
const userService = require('../services/userService');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req,res,next) => {

    const error = validationResult(req);


    if(!error.isEmpty()) res.status(400).json({errors: error.array()});

    try {

        const {fullname, email, password} = req.body;

        const hashedPassword = await userModel.createPassword(password);

        const user = await userService.createUser({
            fullname:{
                firstname: fullname.firstname, 
                lastname: fullname.lastname,
            },
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        return res.status(200).json({
            token,
            user
        });
        
    } catch (error) {
        console.error(`Register user error : ${error}`);
        
    }
}


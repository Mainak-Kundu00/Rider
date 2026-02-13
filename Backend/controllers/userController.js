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

module.exports.loginUser = async (req, res, next) => {
    
    const error = validationResult(req);


    if(!error.isEmpty()) res.status(400).json({errors: error.array()});

    try {

        const {email, password} = req.body;

        const user =await userModel.findOne({email}).select('+password');

        if (!user) {
            return res.status(401).json({message: 'User not Found'});
        }

        const matchPassword = await user.matchPassword(password);

        if (!matchPassword) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = user.generateAuthToken();

        return res.status(200).json({
            token,
            user
        });

    } catch (error) {
        console.error(`Login error : ${error}`);
        
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    return res.status(201).json(req.user);
}
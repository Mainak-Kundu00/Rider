const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const controller = require('../controllers/userController');


router.post('/register',[
    body('email').isEmail().withMessage("Email is required"),
    body('fullname.firstname').isLength({min:3}).withMessage("minimum 3 characters required"),
    body('password').isLength({min:6}).withMessage("Password must be 6 characters long "),
],
    controller.registerUser
);


router.post('/login',[
    body('email').isEmail().withMessage("Email is required"),
    body('password').isLength({min:6}).withMessage("Password must be 6 characters long "),
],
    controller.loginUser
);



module.exports = router;
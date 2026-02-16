const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minlength: [3,'First Name should be atleast 3 characters'] // to see db how db validation works
        },
        lastname: {
            type: String,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this.id}, process.env.JWT_SECRET, {expiresIn: '24h'}); 
    return token;
}


userSchema.statics.createPassword = async function (password) {
    return await bcrypt.hash(password,12);
}


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

const user = mongoose.model('user',userSchema);

module.exports = user;
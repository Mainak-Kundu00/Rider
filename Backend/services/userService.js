const userModel = require('../models/user.model');



module.exports.createUser = async ({
    fullname, email, password
}) => {
    try {
        
        if(!fullname.firstname || !email || !password) throw new Error("Please fill required fields!!!");
        

        const user = userModel.create({
            fullname: {
                firstname: fullname.firstname, 
                lastname: fullname.lastname,
            },
            email,
            password
        });
        
        return user;

    } catch (error) {
        console.error(`User creation failed, reason: ${error}`);
    }
}
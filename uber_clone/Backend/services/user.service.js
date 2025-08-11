const userModel = require("../models/user.models");


module.exports.createUser = async ({
    firstname, lastname, email, password,MobileNumber
}) => {
    if(!firstname || !email || !password || !MobileNumber) {
        throw new Error("All fields are required");
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        MobileNumber
    });
    return user;
}

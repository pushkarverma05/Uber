const userModel = require('../models/user.models');

module.exports.createUser = async function (payload) {
    const firstname = payload.firstname || payload.fullname?.firstname;
    const lastname = payload.lastname || payload.fullname?.lastname;
    const email = payload.email;
    const password = payload.password;

    const missing = [];
    if (!firstname) missing.push('firstname');
    if (!email) missing.push('email');
    if (!password) missing.push('password');
    if (missing.length) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    const user = await userModel.create({
        fullname: { firstname, lastname },
        email,
        password,
    });
    return user;
};

const userModel = require("../models/user.models")
const userService = require("../services/user.service");
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    const { fullname: { firstname, lastname }, email, password } = req.body;
    const isuserAlreadyExists = await userModel.findOne({ email });
    if (isuserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Create user using the service
    try {
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
                firstname,
                lastname,
            email,
            password: hashedPassword
        });
        const token = user.generateAuthToken();
        res.status(201).json({ token,user });
    }
    catch (error) {
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({ token, user });
    }
    catch (error) {
        next(error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenSchema.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
}
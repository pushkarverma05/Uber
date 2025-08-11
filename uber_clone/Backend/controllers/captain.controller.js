const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    }

    const {fullname :{firstname , lastname}, email, password, vehicle} = req.body;

    const isCaptianAlreadyExists = await captianModel.findOne({email});
    if (isCaptianAlreadyExists) {
        return res.status(400).json({message: "Captian with this email already exists"});
    }
    try {
        // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create captain using the service
        const captain = await captainService.createCaptain({
            firstname,
            lastname,
            email,
            password : hashedPassword,
            // Vehicle details
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicletype: vehicle.vehicletype
        });

        const token = captain.generateAuthToken();
        res.status(201).json(
            {
                token,
                captain
            }
        );

    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    }

    const {email, password} = req.body;

    try {
        const captain = await captainModel.findOne({email}).select('+password');
        if (!captain) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({token, captain});
    } catch (error) {
        next(error);
    }
}
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain});
}
module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenSchema.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
}


const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    }

    const {fullname , email, password, vehicle} = req.body;
         const firstname = fullname?.firstname;
       const lastname = fullname?.lastname;
       const color = vehicle?.color;
            const plate = vehicle?.plate;
            const capacity = vehicle?.capacity;
            const vehicletype = vehicle?.vehicletype;

    const isCaptianAlreadyExists = await captainModel.findOne({email});
    if (isCaptianAlreadyExists) {
        return res.status(400).json({message: "Captian with this email already exists"});
    }
    try {
        // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create captain using the service
        const captain = await captainService.createCaptain({
          fullname: { firstname, lastname },
          email,
          password: hashedPassword,
          vehicle: {
            color,
            plate,
            capacity,
            vehicletype
          }
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


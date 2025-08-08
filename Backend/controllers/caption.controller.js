const captionModel = require('../models/caption.model');
const captionService = require('../services/caption.service');
const {validationResult} = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model');

module.exports.registerCaption = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    }

    const {fullname :{firstname , lastname}, email, password, vehicle} = req.body;

    const isCaptionAlreadyExists = await captionModel.findOne({email});
    if (isCaptionAlreadyExists) {
        return res.status(400).json({message: "Caption with this email already exists"});
    }
    try {
        // Hash the password
    const hashedPassword = await captionModel.hashPassword(password);

    // Create caption using the service
        const caption = await captionService.createCaption({
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

        const token = caption.generateAuthToken();
        res.status(201).json(
            {
                token,
                caption
            }
        );

    } catch (error) {
        next(error);
    }
}

module.exports.loginCaption = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errors: error.array()});
    }

    const {email, password} = req.body;

    try {
        const caption = await captionModel.findOne({email}).select('+password');
        if (!caption) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const isMatch = await caption.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = caption.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({token, caption});
    } catch (error) {
        next(error);
    }
}
module.exports.getCaptionProfile = async (req, res, next) => {
    res.status(200).json({caption: req.caption});
}
module.exports.logoutCaption = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenSchema.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
}


// import rideService from '../services/ride.service';
// import { validationResult } from 'express-validator';
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // Get coordinates
        const pickupCoords = await mapService.getAddressCoordinate(pickup);
        const destCoords = await mapService.getAddressCoordinate(destination);

        if (
            !pickupCoords || pickupCoords.lat == null || pickupCoords.lon == null ||
            !destCoords || destCoords.lat == null || destCoords.lon == null
        ) {
            return res.status(400).json({ message: 'Invalid pickup or destination coordinates' });
        }

        // Save ride in DB with both string + coordinates
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,  // ✅ save as string
            pickupCoordinates: pickupCoords,  // ✅ save coordinates separately
            destination,
            destinationCoordinates: destCoords,
            vehicleType,
        });

        // Fetch nearby captains
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoords.lat,
            pickupCoords.lon,
            2 // radius in km
        );
        console.log("Captains in radius:", captainsInRadius);

        // Populate user for socket notification
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(
                captain.socketId,
                {
                    event: 'new-ride',
                    data: rideWithUser
                }
            );
        });

        return res.status(201).json({ ride });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    // Validate pickup and destination
    if (!pickup || !destination) {
        return res.status(400).json({ message: "Pickup and destination are required" });
    }

    // 1️⃣ Get coordinates for pickup and destination

    try {
        const pickupCoords = await mapService.getAddressCoordinate(pickup);
        const destCoords = await mapService.getAddressCoordinate(destination);

        if (!pickupCoords || !pickupCoords.lat || !pickupCoords.lon ||
            !destCoords || !destCoords.lat || !destCoords.lon) {
            return res.status(404).json({ message: "Invalid pickup or destination address" });
        }

        const fare = await rideService.getFare(pickupCoords, destCoords);
        return res.status(200).json({ fare });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide( {rideId, captain: req.captain._id});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
        
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-completed',
            data: ride
        }); 
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
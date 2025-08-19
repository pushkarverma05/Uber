const express = require('express');
const { body ,query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().withMessage('Pickup location is required'),
    body('destination').isString().withMessage('Destination location is required'),
    body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vehicle type'),
    rideController.createRide
);


router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().withMessage('Pickup location is required'),
    query('destination').isString().withMessage('Destination location is required'),
    rideController.getFare
);

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.confirmRide
);

router.post('/start-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    body('otp').isString().isLength({ min: 4, max: 4 }).withMessage('OTP must be a 4-digit number'),
    rideController.startRide
);

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    rideController.endRide
);

module.exports = router;


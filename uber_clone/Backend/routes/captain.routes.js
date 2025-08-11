const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isString().isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isString().isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isString().isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isString().isLength({min: 1}).withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isNumeric().isInt({gt: 0}).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.vehicletype').isString().isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of: car, bike, auto'),
],

captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isString().isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
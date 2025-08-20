const captainModel = require('../models/captain.model');


module.exports.createCaptain = async function (payload) {
    // Support both nested and flat structures
    const firstname = payload.firstname || payload.fullname?.firstname;
    const lastname = payload.lastname || payload.fullname?.lastname;
    const email = payload.email;
    const password = payload.password;

    // Vehicle data may arrive as vehicle.{color,plate,capacity,vehicletype} or flat
    const vehicleObj = payload.vehicle || {};
    const color = payload.color || vehicleObj.color;
    const plate = payload.plate || vehicleObj.plate;
    const capacity = payload.capacity || vehicleObj.capacity;
    const vehicletype = payload.vehicletype || vehicleObj.vehicletype;

    const missing = [];
    if (!firstname) missing.push('fullname.firstname');
    if (!email) missing.push('email');
    if (!password) missing.push('password');
    if (!color) missing.push('vehicle.color');
    if (!plate) missing.push('vehicle.plate');
    if (capacity === undefined || capacity === null) missing.push('vehicle.capacity');
    if (!vehicletype) missing.push('vehicle.vehicletype');

    if (missing.length) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    const captain = await captainModel.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicletype
        }
    });

    return captain;
};

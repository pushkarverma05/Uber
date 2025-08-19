const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./map.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
      throw new Error("Pickup and destination are required to calculate fare");
    }
    const distanceTime = await mapService.getDistanceTimeMatrix(pickup, destination);
    const baseFare = {
        auto :30,
        car: 50,
        bike:20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    };
    const fare ={
        auto : Math.round(baseFare.auto + (distanceTime.distance_km * perKmRate.auto) + (distanceTime.time_minutes * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceTime.distance_km * perKmRate.car) + (distanceTime.time_minutes * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + (distanceTime.distance_km * perKmRate.bike) + (distanceTime.time_minutes * perMinuteRate.bike))
    };
    return fare;
  }

  function getOTP(num){
    function generateOTP(num) {
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
  }
  return generateOTP(num);
  }
  module.exports.getFare = getFare;
  
module.exports.createRide = async ({ 
    user, 
    pickup,                  // string address
    pickupCoordinates,       // { lat, lon }
    destination,             // string address
    destinationCoordinates,  // { lat, lon }
    vehicleType
}) => {

    // Use coordinates for fare calculation
    const fare = await getFare(pickupCoordinates, destinationCoordinates);
    console.log("Fare:", fare);

    const ride = await rideModel.create({
        user,
        pickup,                  // string
        pickupCoordinates,       // object { lat, lon }
        destination,             // string
        destinationCoordinates,  // object { lat, lon }
        otp: getOTP(4),
        fare: fare[vehicleType], // only the relevant fare type
        vehicleType
    });

    return ride;
};

module.exports.confirmRide = async ({
    rideId,
    captain
}) => {
   if (!rideId || !captain) {
       throw new Error("Invalid ride or captain");
   }

   await rideModel.findOneAndUpdate(
       {
         _id: rideId
       },
       { status: 'accepted',
         captain: captain._id
        });

   // Atomically accept only if still pending
   const ride = await rideModel.findOne(
       { _id: rideId, 
       },
   ).populate('user').populate('captain').select('+otp');

   return ride;
}


module.exports.startRide = async ({
    rideId,
    otp,
    captain
}) => {
    if (!rideId || !otp || !captain || !captain._id) {
        throw new Error("Invalid ride, OTP or captain");
    }

    // Fetch ride with OTP
    const ride = await rideModel.findOne({ _id: rideId })
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        throw new Error("Ride not found");
    }
    if (ride.status !== 'accepted') {
        throw new Error("Ride is not accepted");
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    // Update ride: start and clear OTP
        await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'in-progress' },
    );

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
};

module.exports.endRide = async ({
    rideId,
    captain
}) => {
    if (!rideId || !captain || !captain._id) {
        throw new Error("Invalid ride or captain");
    }

    // Fetch ride
    const ride = await rideModel.findOne({
         _id: rideId,
         captain: captain._id
        })
        .populate('user')
        .populate('captain')
        .select('+otp');
    if (!ride) {
        throw new Error("Ride not found");
    }
    if (ride.status !== 'in-progress') {
        throw new Error("Ride is not in progress");
    }

    // Update ride status
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'completed' }
    );

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-completed',
        data: ride
    });

    return ride;
};

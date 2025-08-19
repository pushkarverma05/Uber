const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  captain: { type: mongoose.Schema.Types.ObjectId, ref: 'captain' },
  
  pickup: { type: String, required: true },              // for display
  pickupCoordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },

  destination: { type: String, required: true },         // for display
  destinationCoordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },

  fare: { type: Number, required: true },
  status: { type: String, enum: ["pending", "accepted", "completed"], default: "pending" },

  duration: {
      type: Number,
  },//in seconds
  distance: {
      type: Number,
    },//in meters
    paymentID: {
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp : {
        type: String,
        select : false,
        required: true
    },
})

module.exports = mongoose.model('ride', rideSchema);
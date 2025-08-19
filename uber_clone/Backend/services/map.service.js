const axios = require("axios");
const captainsModel = require('../models/captain.model');

const GRAPH_HOPPER_KEY = process.env.GRAPH_HOPPER_KEY;
const BASE_URL = "https://graphhopper.com/api/1";

// Get coordinates from address
module.exports.getAddressCoordinate = async function (address) {
  try {
    const res = await axios.get(`${BASE_URL}/geocode`, {
      params: { q: address,  locale: "en",
        limit: 1, key: GRAPH_HOPPER_KEY }
    });

    if (res.data.hits && res.data.hits.length > 0) {
      const { point } = res.data.hits[0];
      return { lat: point.lat, lon: point.lng };
    }
    return null;
  } catch (error) {
    console.error("Error in getAddressCoordinate:", error.response?.data || error.message);
    return null;
  }
};

// Get distance & time using coordinates
module.exports.getDistanceTimeMatrix = async function (origin, destination) {
  try {
    const res = await axios.post(`${BASE_URL}/matrix`, {
      points: [
        [origin.lon, origin.lat], // GraphHopper expects [lon, lat]
        [destination.lon, destination.lat]
      ],
      profile: "car",
      out_arrays: ["distances", "times"]
    }, {
      params: { key: GRAPH_HOPPER_KEY }
    });

    const { distances, times } = res.data;
    const distanceMeters = distances[0][1];
    const timeSeconds = times[0][1];

    return {
      distance_km: (distanceMeters / 1000).toFixed(2),  // meters → km
      time_minutes: (timeSeconds / 60).toFixed(2)       // seconds → minutes
    };
  } catch (error) {
    console.error("Error in getDistanceTimeMatrix:", error.response?.data || error.message);
    throw error;
  }
};

module.exports.getAutocompleteSuggestions = async function (input) {
  try {
    const res = await axios.get(`${BASE_URL}/geocode`, {
      params: {
        q: input,
        limit: 5, // Number of suggestions
        key: GRAPH_HOPPER_KEY
      }
    });

    // Format suggestions
    return res.data.hits.map(hit => ({
      name: hit.name,
      country: hit.country,
      state: hit.state,
      city: hit.city,
      street: hit.street,
      postcode: hit.postcode,
      lat: hit.point.lat,
      lon: hit.point.lng
    }));
  } catch (error) {
    console.error("Error in getAutocompleteSuggestions:", error.response?.data || error.message);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async function (lat, lon, radius) {

  // radius in km
  const captains = await captainsModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lat, lon], radius / 6378.1] // radius in km
      }
    }
  });
  return captains;
};

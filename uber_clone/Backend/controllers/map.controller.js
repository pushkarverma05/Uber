const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');
const {query} = require('express-validator');


module.exports.getCoordinates = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { address } = req.query;

        try {
            const coordinates = await mapService.getAddressCoordinate(address);
            res.status(200).json(coordinates);
        } catch (error) {
            res.status(404).json({ message: 'Coordinates not found' });
        }
}


module.exports.getDistanceTimeByAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    // Step 1: Convert addresses to coordinates
    const originCoords = await mapService.getAddressCoordinate(origin);
    const destinationCoords = await mapService.getAddressCoordinate(destination);

    if (!originCoords || !destinationCoords) {
      return res.status(404).json({ message: "Could not find coordinates for one or both addresses" });
    }

    // Step 2: Get distance & time
    const result = await mapService.getDistanceTimeMatrix(originCoords, destinationCoords);

    res.status(200).json({
      origin,
      destination,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching distance and time",
      error: error.message
    });
  }
};

module.exports.getAutocompleteSuggestions = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;

    const suggestions = await mapService.getAutocompleteSuggestions(input);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions", details: error.message });
  }
};

// New: controller for route between coordinates


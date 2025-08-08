const captionModel = require('../models/caption.model');


module.exports.createCaption = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicletype,
}) => {
   if (!firstname || !email || !password || !color || !plate || !capacity || !vehicletype) {
        throw new Error("All fields are required");
    }
    const caption =  captionModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicletype
        }
    });

    return caption;
}

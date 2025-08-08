const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captionSchema = new mongoose.Schema({
    fullname: {
    firstname: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastname: {
        type: String,
        required: false, // Assuming lastname is optional, you can modify this as needed
        minlength: 3,
    }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    scocketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
       color: {
            type: String,
            required: true,
            minlength: 3,
        },
        plate: {
            type: String,
            required: true,
            minlength: 1,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        vehicletype: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
});

captionSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

captionSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

captionSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const captionModel = mongoose.model('caption', captionSchema);

module.exports = captionModel;
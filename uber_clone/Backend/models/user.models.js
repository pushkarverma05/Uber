const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
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
        required: false, // Email is optional for users who register with MobileNumber
        unique: true,
    },
    password: {
        type: String,
        required: false, // Password is optional for users who register with MobileNumber
        minlength: 6,
        select: false,
    },
    MobileNumber: {
       type: String,
    required: false, // MobileNumber is optional for users who register with email
    unique: true,
  },
  firebaseUID: {
    type: String,
    required: false, // Firebase UID is optional for users who register with email
    unique: true,
  },
    socketId: {
        type: String,
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    }
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
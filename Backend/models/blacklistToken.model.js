const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: { 
        type: String, 
        required: true, 
        unique: true }
}, {
    timestamps: true
});

blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24 hours

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
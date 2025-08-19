const socketIo = require('socket.io');
const userModel = require('./models/user.models');
const captainModel = require('./models/captain.model');


let io;

/**
 * Initialize socket.io on the provided HTTP server.
 * Safe to call multiple times (returns existing instance).
 */
function initializeSocket(server) {
    if (io) return io;
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            if (!location || !location.lat || !location.lon) {
                console.error('Invalid location data received:', location);
                return socket.emit('error', { message: 'Invalid location data' });
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lon: location.lon
                }
            });
        });


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
}

/**
 * Emit an event with payload to a specific socket id.
 * Returns true if socket found and message sent, else false.
 */
function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        return true;
    } else {
        console.log("socket.io not initialized");
        return false;
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};

// middlewares/socketAuth.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication failed: No token provided'));
        }

        const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return next(new Error('Authentication failed: User not found'));
        }

        socket.user = user;
        next();
    } catch (error) {
        return next(new Error('Authentication failed'));
    }
};

export default socketAuthMiddleware;

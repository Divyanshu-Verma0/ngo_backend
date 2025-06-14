const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');
const auth = require('../models/auth'); // Adjust path as per your structure

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

const authenticate = async (req, res, next) => {
    try {
        let token;

        // 1. Check for token in Authorization header
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split('Bearer ')[1];
        }

        // 2. If not in header, check cookies
        if (!token && req.cookies) {
            token = req.cookies.authToken; // Use the same key you used to set the cookie
        }

        // 3. If token is still missing, throw an error
        if (!token) {
            throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, 'No valid token provided');
        }

        // 4. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 5. Retrieve user from database
        const user = await auth.findById(decoded.id);
        if (!user) {
            throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, 'Invalid or expired token');
        }

        // 6. Attach user to the request object
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authenticate };

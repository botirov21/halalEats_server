const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    try {
        // Get the token from the request cookies
        const token = req.cookies.token;

        // If token is not present, call next without setting req.user
        if (!token) {
            return next();
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by the decoded user ID
        const user = await User.findById(decoded.id);

        // If user is not found, call next without setting req.user
        if (!user) {
            return next();
        }

        // Set the user in the request object
        req.user = user;
        next();
    } catch (error) {
        next(error); // Forward any errors to the error handling middleware
    }
};

// Middleware for admin role
exports.isAdmin = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
        // If user is not authenticated, return Unauthorized error
        return next(new ErrorResponse('Unauthorized', 401));
    }

    // Check if user role is admin
    if (req.user.role !== 'admin') {
        // If user is not an admin, return Forbidden error
        return next(new ErrorResponse('Access denied, you must be an admin', 403));
    }

    // If user is authenticated and is an admin, proceed to next middleware or route handler
    next();
};

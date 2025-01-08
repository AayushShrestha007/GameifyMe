const jwt = require('jsonwebtoken');
require('dotenv').config();

const authGuard = (req, res, next) => {
    // Check incoming headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header not found',
        });
    }

    // Expect header in format "Bearer token"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found',
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('JWT verification error:', error);
        res.status(401).json({
            success: false,
            message: 'Not authorized',
            error: error.message,
        });
    }
};


const adminGuard = (req, res, next) => {
    // Make sure authGuard ran first to set req.user
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated',
        });
    }

    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Access denied: Admins only',
        });
    }

    next();
};

module.exports = {
    authGuard,
    adminGuard,
};
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {   
    try {
        // Get token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.user = decoded; // Attach user data to request
            next(); // Move to the next middleware/controller
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = verifyToken;

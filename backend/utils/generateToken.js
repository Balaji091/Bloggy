
const jwt = require('jsonwebtoken');

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token valid for 7 days
    });
};

module.exports = generateToken;

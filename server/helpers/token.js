const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
    });
};

module.exports = {
    generateAccessToken,
};

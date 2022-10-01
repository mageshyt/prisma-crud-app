
const jwt=require('jsonwebtoken');


const getJwtToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7 days'});
}

module.exports = {getJwtToken}
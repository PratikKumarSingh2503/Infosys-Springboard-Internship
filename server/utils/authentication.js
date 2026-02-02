const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function createUserToken(user) {

    const payload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
        phoneNumber: user.phoneNumber,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        admin: user.admin
    };

    const token = jwt.sign(payload, secret);
    return token;
}

function verifyUser(token) {
    const user = jwt.verify(token, secret);
    return user;
}

module.exports = {
    createUserToken,
    verifyUser
};
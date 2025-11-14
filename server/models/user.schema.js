const { Schema, model } = require('mongoose');
const { randomBytes, createHmac } = require('crypto');
const { createUserToken } = require('../utils/authentication');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [ 3, 'fullname must be 3 letters long' ]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    profilePic: {
        type: String,
        default: "/images/man_5-1024.webp"
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTimeout: {
        type: Date
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("user not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (userProvidedHash !== hashedPassword) throw new Error('invalid credentials');

    const token = createUserToken(user);

    return token;

});



userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const passwordHash = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = passwordHash;

    next();
});

const User = model('user', userSchema);

module.exports = User;
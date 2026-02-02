const User = require('../models/user.schema');
const { createUserToken } = require('../utils/authentication');
const { registrationValidation, loginValidation } = require('../utils/validations');
const { randomBytes, createHmac } = require('crypto');
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    const { fullname, email, password, phoneNumber, address } = req.body;
    try {
        if (registrationValidation(fullname, email, password, phoneNumber, address)) {
            await User.create({
                fullname,
                email,
                password,
                phoneNumber,
                address
            });
            console.log(fullname, email, password, phoneNumber, address);
            return res.status(201).json({ success: true, 'message': 'User created' });
        } else {
            throw new Error('Invalid Inputs');
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error, 'message': 'Some error occured' });

    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (loginValidation(email, password)) {

            const token = await User.matchPasswordAndGenerateToken(email, password);
            res.cookie('token', token);
            const user = await User.findOne({ email }).select("-password -salt");
            return res.status(200).json({ success: true, user: user });
        } else {
            throw new Error('Invalid inputs');
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const resetToken = randomBytes(16).toString('hex');
        const resetPasswordToken = createHmac('sha256', process.env.JWT_SECRET).update(resetToken).digest('hex');
        const resetPasswordTimeout = Date.now() + 10 * 60 * 1000; //10 minutes

        await User.findByIdAndUpdate({ _id: user._id }, { resetPasswordToken, resetPasswordTimeout });

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: '"Inventory Management Team" <iimtthree@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Reset Password ✔", // Subject line
            text: "Password reset ", // plain text body
            html: `<b>You requested a password reset. This is valid till 10 minutes. Please click here - ${resetUrl} </b>`, // html body
        });

        return res.status(200).json({ message: "Email Sent Successfully!" });


    } catch (error) {
        return res.status(400).json({ error: error });

    }

};

const resetPassword = async (req, res) => {
    const salt = process.env.JWT_SECRET;
    const resetPasswordToken = createHmac('sha256', salt).update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTimeout: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: error, message: 'Invalid or expired token' });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTimeout = undefined;

    await user.save();  // This will trigger the pre-save hook

    res.status(200).json({ success: true, message: 'Password reset successful' });
};

const editProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true });
        const token = createUserToken(user);
        res.cookie('token', token);
        return res.status(200).json({ success: true, message: "user updated", token: token });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });

    }
};


const getUser = async (req, res) => {
    const user = req.user;

    return res.status(200).json(user);

};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    editProfile,
    getUser
};
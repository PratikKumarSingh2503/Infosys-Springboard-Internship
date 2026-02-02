const jwt = require("jsonwebtoken");
const User = require("../models/user.schema"); // Ensure correct path
const { verifyUser } = require("../utils/authentication");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
    try {
        // Accept token from cookie (same-origin) OR Authorization header (cross-origin e.g. Vercel → API)
        const cookieToken = req.cookies?.token;
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
        const token = cookieToken || bearerToken;

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify token

        const decoded = verifyUser(token);
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Fetch user from database
        const user = await User.findById(decoded._id).select("-password"); // Exclude password

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = user; // Attach user data to request
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticateUser;

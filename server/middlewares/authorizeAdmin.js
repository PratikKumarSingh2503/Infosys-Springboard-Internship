const authorizeAdmin = (req, res, next) => {

    if (!req.user || !req.user.admin) {
        return res.status(403).json({ error: "Forbidden. You don't have permission to access this resource." });
    }
    next(); // Proceed if user is admin
};

module.exports = authorizeAdmin;

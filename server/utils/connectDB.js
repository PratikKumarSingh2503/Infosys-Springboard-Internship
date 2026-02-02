const { default: mongoose } = require("mongoose");

const connectDB = (url) => {
    mongoose.connect(url)
        .then(() => console.log('connect to DB!'))
        .catch((err) => console.log(err));
};

module.exports = connectDB;
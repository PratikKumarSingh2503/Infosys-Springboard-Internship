const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    turnOver: {
        type: Number,
        default: 0,
    },
    preTurnOver: {
        type: Number,
        default: 0
    }
}, { timestamps: true });



const Category = model('category', categorySchema);

module.exports = Category;
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
    },
    qtySold: {
        type: Number,
        default: 0
    },
    qtyRemaining: {
        type: Number,
        default: 0
    },
    thresholdValue: {
        type: Number,
        default: 10
    },

}, { timestamps: true });



const Product = model('product', productSchema);

module.exports = Product;
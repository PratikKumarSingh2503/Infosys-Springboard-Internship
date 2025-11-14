const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderValue: {
        type: Number,
        required: true
    },
    expectedDelivery: {
        type: String,
        default: "",
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    supplierId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Confirmed"
    }

}, { timestamps: true });



const Order = model('order', orderSchema);

module.exports = Order;
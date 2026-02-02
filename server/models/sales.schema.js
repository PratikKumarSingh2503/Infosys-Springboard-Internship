const { Schema, model } = require('mongoose');

const salesSchema = new Schema({
    product: {
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



const Sale = model('sale', salesSchema);

module.exports = Sale;
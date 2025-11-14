const { Schema, model } = require('mongoose');

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: String
    },
    category: {
        type: String
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    onTheWay: {
        type: Number,
        default: 0
    },
    supplierImage: {
        type: String
    },
    supplierId: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });



const Supplier = model('supplier', supplierSchema);

module.exports = Supplier;
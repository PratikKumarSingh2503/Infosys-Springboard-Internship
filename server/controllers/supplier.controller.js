const Supplier = require('../models/supplier.schema');
const { randomBytes } = require('crypto');
const addSupplier = async (req, res) => {
    const { name, product, category, contact, email, type, supplierImage } = req.body;

    try {
        const supplier = await Supplier.findOne({ email });
        console.log('here');
        if (supplier) return res.status(400).json({ message: "User already exists" });
        const newSupplier = await Supplier.create({ name, product, category, contact, email, type, supplierImage: supplierImage || "", supplierId: randomBytes(4).toString('hex') });
        return res.status(201).json({ message: "Supplier added!", supplier: newSupplier });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getSuppliers = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        const totalItems = await Supplier.countDocuments();

        const suppliers = await Supplier.find({}, null, { sort: { updatedAt: -1 } }).skip(skip).limit(limit);
        return res.status(200).json({
            suppliers,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            hasNextPage: page * limit < totalItems,
            hasPrevPage: page > 1
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    addSupplier,
    getSuppliers,

};
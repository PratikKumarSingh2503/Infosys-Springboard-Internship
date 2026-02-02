const Category = require("../models/categories.schema");
const Order = require("../models/orders.schema");
const Product = require("../models/products.schema");
const Supplier = require("../models/supplier.schema");
const { getSupplierBySupplierId } = require("./supplier.controller");


const placeOrder = async (req, res) => {
    try {
        const { name, supplierId, category, quantity, unit, orderValue, expectedDelivery, productImage } = req.body;

        await Order.create({
            name,
            supplierId,
            category,
            quantity,
            unit,
            orderValue,
            expectedDelivery
        });

        let product = await Product.findOne({ name });

        if (!product) {
            const sp = ((parseFloat(orderValue) / parseFloat(quantity)) * 110) / 100;
            const cp = parseFloat(orderValue) / parseFloat(quantity);

            await Product.create({
                name,
                category,
                cost: cp,
                sellingPrice: sp,
                unit,
                qtyRemaining: 0,
                productImage: productImage || ""
            });
        }

        const supplier = await Supplier.findOne({ supplierId });

        if (supplier) {
            supplier.onTheWay = parseInt(quantity);
            supplier.product = name;
            await supplier.save();
        } else {
            return res.status(400).json({ message: "Supplier not found" });
        }

        return res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wrong, Please try again" });
    }
};

const overAllOrders = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalReceived = await Order.countDocuments({ status: 'Delivered' });
        const totalReturned = await Order.countDocuments({ status: 'Returned' });
        const totalOnTheWay = await Order.countDocuments({ status: { $in: [ 'Confirmed', 'Delayed' ] } });

        const totalReceivedValue = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $group: { _id: null, total: { $sum: '$orderValue' } } }
        ]);
        const totalReturnedValue = await Order.aggregate([
            { $match: { status: 'Returned' } },
            { $group: { _id: null, total: { $sum: '$orderValue' } } }
        ]);
        const totalOnTheWayValue = await Order.aggregate([
            { $match: { status: { $in: [ 'Confirmed', 'Delayed' ] } } },
            { $group: { _id: null, total: { $sum: '$orderValue' } } }
        ]);

        const totalReceivedCost = totalReceivedValue[ 0 ] ? totalReceivedValue[ 0 ].total : 0;
        const totalReturnedCost = totalReturnedValue[ 0 ] ? totalReturnedValue[ 0 ].total : 0;
        const totalOnTheWayCost = totalOnTheWayValue[ 0 ] ? totalOnTheWayValue[ 0 ].total : 0;
        return res.status(200).json({
            totalOrders,
            totalReceived,
            totalReturned,
            totalOnTheWay,
            totalReceivedCost,
            totalReturnedCost,
            totalOnTheWayCost
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getOrders = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;
        const totalDocs = await Order.countDocuments();
        const orders = await Order.find({}, null, { sort: { updatedAt: -1 } }).skip(skip).limit(limit);
        return res.status(200).json({
            orders,
            currentPage: page,
            totalPages: Math.ceil(totalDocs / limit),
            hasNextPage: page * limit < totalDocs,
            hasPrevPage: page > 1
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }
};

module.exports = {
    placeOrder,
    getOrders,
    overAllOrders
};
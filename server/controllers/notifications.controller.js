const Notification = require("../models/notifications.schema");
const Order = require("../models/orders.schema");
const Product = require("../models/products.schema");
const Supplier = require("../models/supplier.schema");

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({})
            .populate('orderId', 'name category quantity orderValue expectedDelivery supplierId');
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const delivered = async (req, res) => {
    try {
        const { _id, orderId: { _id: id, supplierId } } = req.body;
        await Order.findByIdAndUpdate(id, { status: 'Delivered' });
        const ord = await Order.findById(id);
        if (!ord) {
            return res.status(404).json({ message: "Order not found" });
        }
        await Product.findOneAndUpdate({ name: ord.name, category: ord.category }, { $inc: { qtyRemaining: ord.quantity } });
        await Supplier.updateOne({ supplierId }, { onTheWay: 0 });
        await Notification.findByIdAndDelete(_id);
        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });

    }
};

const delay = async (req, res) => {
    try {
        const { orderId: { _id: id } } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(id, { status: 'Delayed' }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });

    }
};

const returned = async (req, res) => {
    try {
        const { _id, orderId: { _id: id, name, category, quantity, supplierId } } = req.body;
        await Order.findByIdAndUpdate(id, { status: 'Returned' });

        await Supplier.updateOne({ supplierId }, { $inc: { onTheWay: -quantity } });

        await Notification.findByIdAndDelete(_id);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server Error" });
    }
};

module.exports = {
    getNotifications,
    delivered,
    delay,
    returned
};
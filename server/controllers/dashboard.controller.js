const Order = require('../models/orders.schema');
const Product = require('../models/products.schema');
const Supplier = require('../models/supplier.schema');

const salesOverview = async (req, res) => {
    try {
        //total no of sales
        const products = await Product.find({ qtySold: { $gt: 0 } });
        let totalSales = 0;
        let totalRevenue = 0;
        let totalProfit = 0;
        let totalCostIncurred = 0;

        products.forEach(product => {
            totalSales += product.qtySold;
            totalRevenue += product.qtySold * product.sellingPrice;
            totalCostIncurred += product.qtySold * product.cost;
        });

        totalProfit = totalRevenue - totalCostIncurred;

        res.status(200).json({
            totalSales,
            totalRevenue,
            totalProfit,
            totalCostIncurred
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const InventorySummary = async (req, res) => {
    try {

        const deliveredOrders = await Order.find({ status: "Delivered" });
        const uniqueDeliveredNames = [ ...new Set(deliveredOrders.map(order => order.name)) ];
        const deliveredProducts = await Product.find({ name: { $in: uniqueDeliveredNames } });
        let quantityInHand = deliveredProducts.reduce((sum, product) => sum + product.qtyRemaining, 0);


        const incomingOrders = await Order.find({ status: { $in: [ "Confirmed", "Delayed" ] } });
        let quantityToBeReceived = incomingOrders.reduce((sum, order) => sum + order.quantity, 0);

        res.status(200).json({
            quantityInHand,
            quantityToBeReceived
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

};

const purchaseOverview = async (req, res) => {
    try {
        // Fetch all orders
        const totalPurchases = await Order.countDocuments();

        // Fetch delivered orders and calculate total cost
        const deliveredOrders = await Order.find({ status: "Delivered" });
        let totalCostDelivered = deliveredOrders.reduce((sum, order) => sum + order.orderValue, 0);

        // Fetch returned orders and calculate total cost
        const returnedOrders = await Order.find({ status: "Returned" });
        let totalCostReturned = returnedOrders.reduce((sum, order) => sum + order.orderValue, 0);

        res.status(200).json({
            totalPurchases,
            totalCostDelivered,
            totalCostReturned
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const productSummary = async (req, res) => {
    try {
        // Fetch all suppliers and ensure uniqueness
        const suppliers = await Supplier.find();
        const uniqueSupplierNames = new Set(suppliers.map(supplier => supplier.name));
        const totalUniqueSuppliers = uniqueSupplierNames.size;

        // Fetch all products and ensure unique categories
        const products = await Product.find();
        const uniqueCategories = new Set(products.map(product => product.category));
        const totalUniqueCategories = uniqueCategories.size;

        res.status(200).json({
            totalUniqueSuppliers,
            totalUniqueCategories
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const salesAndPurchases = async (req, res) => {
    try {
        const salesData = await Product.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalSalesAmount: { $sum: { $multiply: [ "$qtySold", "$sellingPrice" ] } }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        const purchaseData = await Order.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalPurchasesAmount: { $sum: "$orderValue" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        // Create a structured response for all 12 months
        const formattedData = Array.from({ length: 12 }, (_, i) => {
            const salesEntry = salesData.find(item => item._id.month === i + 1) || { totalSalesAmount: 0 };
            const purchaseEntry = purchaseData.find(item => item._id.month === i + 1) || { totalPurchasesAmount: 0 };
            return {
                month: new Date(0, i).toLocaleString("default", { month: "short" }),
                Sales: salesEntry.totalSalesAmount,
                Purchase: purchaseEntry.totalPurchasesAmount
            };
        });

        res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const orderSummary = async (req, res) => {
    try {
        const orderedData = await Order.aggregate([
            {
                $match: { status: { $in: [ "Confirmed", "Delayed", "Returned", "Delivered" ] } } // Filter orders that are confirmed
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalOrdered: { $sum: "$quantity" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        const deliveredData = await Order.aggregate([
            {
                $match: { status: "Delivered" } // Filter orders that are delivered
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalDelivered: { $sum: "$quantity" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        // Structure response to include all months
        const formattedData = Array.from({ length: 12 }, (_, i) => {
            const orderedEntry = orderedData.find(item => item._id.month === i + 1) || { totalOrdered: 0 };
            const deliveredEntry = deliveredData.find(item => item._id.month === i + 1) || { totalDelivered: 0 };
            return {
                month: new Date(0, i).toLocaleString("default", { month: "short" }),
                Ordered: orderedEntry.totalOrdered,
                Delivered: deliveredEntry.totalDelivered
            };
        });

        res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const topSellingStock = async (req, res) => {
    // get top three record only
    try {
        const topProducts = await Product.find({}, { name: 1, qtySold: 1, qtyRemaining: 1, sellingPrice: 1 }) // Select only required fields
            .sort({ qtySold: -1 }) // Sort in descending order of qtySold
            .limit(3); // Get top 3

        res.status(200).json(topProducts);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const lowQuantityStock = async (req, res) => {
    // get top three record only
    try {
        const lowStockProducts = await Product.find(
            { qtyRemaining: { $lte: 10 } }, // Filter for products with qtyRemaining <= 10
            { name: 1, productImage: 1, qtyRemaining: 1 } // Select required fields
        )
            .sort({ qtyRemaining: 1 }) // Sort by qtyRemaining (ascending)
            .limit(3); // Get only the top 3

        res.status(200).json(lowStockProducts);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

};

module.exports = {
    salesOverview,
    InventorySummary,
    purchaseOverview,
    productSummary,
    salesAndPurchases,
    orderSummary,
    topSellingStock,
    lowQuantityStock
};
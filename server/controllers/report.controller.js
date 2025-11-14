const Product = require('../models/products.schema');
const Order = require('../models/orders.schema');
const Category = require('../models/categories.schema');

const overview = async (req, res) => {
    try {
        // Fetch all products
        const products = await Product.find();

        let totalProfit = 0;
        let totalRevenue = 0;
        let totalSales = 0;
        let netPurchaseValue = 0;

        // Calculate Total Sales, Revenue, Profit, and Net Sales Value
        products.forEach(product => {
            totalSales += product.qtySold;
            totalRevenue += product.qtySold * product.sellingPrice;
            netPurchaseValue += product.qtySold * product.cost;
        });

        totalProfit = totalRevenue - netPurchaseValue;

        // Fetch orders for MoM Profit and YoY Profit calculations
        const orders = await Order.find();
        let momProfit = 0;
        let yoyProfit = 0;

        orders.forEach(order => {
            if (order.status === "Delivered") {
                momProfit += order.orderValue * 0.2; // Assuming 20% profit margin for MoM
                yoyProfit += order.orderValue * 0.5; // Assuming 50% profit margin for YoY
            }
        });

        res.status(200).json({
            totalProfit,
            totalRevenue,
            totalSales,
            netPurchaseValue,
            momProfit,
            yoyProfit
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const bestSellingCategory = async (req, res) => {
    try {
        // Aggregate total turnover for each category
        const categorySales = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalTurnover: { $sum: { $multiply: [ "$qtySold", "$sellingPrice" ] } }
                }
            },
            { $sort: { totalTurnover: -1 } }, // Sort by highest turnover
            { $limit: 3 } // Get top 3 categories
        ]);

        // Fetch category details from Category Schema
        const topCategories = await Category.find({ category: { $in: categorySales.map(c => c._id) } });

        // Format response
        const result = topCategories.map(category => {
            const turnover = categorySales.find(c => c._id === category.category)?.totalTurnover || 0;
            return {
                category: category.category,
                turnover,
                preTurnOver: category.preTurnOver
            };
        });

        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const profitAndRevenue = async (req, res) => {
    try {
        // Aggregate revenue by month (Revenue = sellingPrice * qtySold)
        const revenueData = await Product.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalRevenue: { $sum: { $multiply: [ "$sellingPrice", "$qtySold" ] } }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        // Aggregate profit by month (Profit = (sellingPrice - cost) * qtySold)
        const profitData = await Product.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalProfit: {
                        $sum: {
                            $multiply: [ { $subtract: [ "$sellingPrice", "$cost" ] }, "$qtySold" ]
                        }
                    }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        // Format response to include all months (fill missing months with 0)
        const formattedData = Array.from({ length: 12 }, (_, i) => {
            const revenueEntry = revenueData.find(item => item._id.month === i + 1) || { totalRevenue: 0 };
            const profitEntry = profitData.find(item => item._id.month === i + 1) || { totalProfit: 0 };

            return {
                month: new Date(0, i).toLocaleString("default", { month: "short" }),
                revenue: revenueEntry.totalRevenue,
                profit: profitEntry.totalProfit
            };
        });

        res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const bestSellingProduct = async (req, res) => {
    try {
        const topProducts = await Product.aggregate([
            {
                $project: {
                    name: 1,
                    productId: "$_id",
                    category: 1,
                    qtyRemaining: 1,
                    turnover: { $multiply: [ "$sellingPrice", "$qtySold" ] } // Turnover = sellingPrice * qtySold
                }
            },
            { $sort: { turnover: -1 } }, // Sort in descending order of turnover
            { $limit: 3 } // Get top 4 products
        ]);

        res.status(200).json(topProducts);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    overview,
    bestSellingCategory,
    profitAndRevenue,
    bestSellingProduct
};
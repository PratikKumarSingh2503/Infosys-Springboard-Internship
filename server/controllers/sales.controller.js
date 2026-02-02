const Category = require("../models/categories.schema");
const Product = require("../models/products.schema");
const Sale = require("../models/sales.schema");

const recordSales = async (req, res) => {
    try {
        const salesData = req.body.sales; // List of sales objects from req.body

        if (!Array.isArray(salesData) || salesData.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid sales data" });
        }

        for (const sale of salesData) {
            const { _id: productId, category, name: productName, quantity } = sale;


            // Fetch the product
            const product = await Product.findById(productId);
            if (!product) {
                console.error(`Product not found: ${productId}`);
                continue;
            }

            // Calculate total turnover for this product
            const revenue = product.sellingPrice * quantity;

            // Update Product Schema (Reduce remaining quantity, increase sold quantity)
            product.qtyRemaining = Math.max(0, product.qtyRemaining - quantity);
            product.qtySold += quantity;
            await product.save();

            // Update Category Schema (Increase turnover)
            let categoryRecord = await Category.findOne({ category });
            if (!categoryRecord) {
                categoryRecord = new Category({ category });
            }
            categoryRecord.preTurnOver = categoryRecord.turnOver;
            categoryRecord.turnOver += revenue;
            await categoryRecord.save();

            // Update Sales Schema (Track sales per product)
            let salesRecord = await Sale.findOne({ product: productName });
            if (!salesRecord) {
                salesRecord = new Sale({ product: productName });
            }
            salesRecord.preTurnOver = salesRecord.turnOver;
            salesRecord.turnOver += revenue;
            await salesRecord.save();
        }

        res.status(200).json({ success: true, message: "Sales recorded successfully" });
    } catch (error) {
        console.error("Error processing sales:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

module.exports = {
    recordSales
};
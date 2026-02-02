const Products = require('../models/products.schema');


const getProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getTopSellingProducts = async (req, res) => {
    try {
        // Fetch top 4 products sorted by qtySold in descending order
        let topProducts = await Products.find().sort({ qtySold: -1 }).limit(4);

        // If no high-selling products are found, fetch the latest 4 products instead
        if (topProducts.length === 0) {
            topProducts = await Products.find().sort({ createdAt: -1 }).limit(4);
        }

        res.status(200).json(topProducts);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProductsByIdsList = async (req, res) => {
    try {


        const { productIds } = req.body;
        console.log(productIds);

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: "Invalid product IDs" });
        }

        const products = await Products.find({ _id: { $in: productIds } });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getProductsByCateogory = async (req, res) => {
    try {
        const { category } = req.query;

        const products = await Products.find({ category });
        if (!products) {
            return res.status(200).json({ message: `No products available in ${category} category` });
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getLimitedProducts = async (req, res) => {
    try {

        const products = await Products.find().limit(8);
        if (!products) {
            return res.status(200).json({ message: `No products available` });
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(200).json({ message: `This product is available` });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        // Case-insensitive regex search for name and category
        const searchRegex = new RegExp(search, "i");

        const products = await Products.find({
            $or: [
                { name: { $regex: searchRegex } },
                { category: { $regex: searchRegex } }
            ]
        });

        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const inventoryStats = async (req, res) => {
    try {
        // Get total unique categories
        const categories = await Products.distinct("category");
        const totalCategories = categories.length;

        // Get total number of products and total revenue
        const allProducts = await Products.find();
        const totalProducts = allProducts.length;
        const totalRevenue = allProducts.reduce((sum, product) => sum + (product.sellingPrice * (product.qtyRemaining + product.qtySold)), 0);

        // Get total number of top-selling products (sold > 0) and their revenue
        const topSellingProducts = allProducts.filter(product => product.qtySold > 0);
        const totalTopSellingProducts = topSellingProducts.length;
        const topSellingRevenue = topSellingProducts.reduce((sum, product) => sum + (product.sellingPrice * product.qtySold), 0);

        // Get total number of products with stock ≤ 10
        const lowStockProducts = allProducts.filter(product => product.qtyRemaining <= 10);
        const totalLowStockProducts = lowStockProducts.length;

        res.status(200).json({
            success: true,
            data: {
                totalCategories,
                totalProducts,
                totalRevenue,
                totalTopSellingProducts,
                topSellingRevenue,
                totalLowStockProducts
            }
        });
    } catch (error) {
        console.error("Error fetching product statistics:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

const productPagination = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        const totalItems = await Products.countDocuments();

        const products = await Products.find({}, null, { sort: { updatedAt: -1 } }).skip(skip).limit(limit);
        return res.status(200).json({
            products,
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
    getProducts,
    getTopSellingProducts,
    getProductsByIdsList,
    getProductsByCateogory,
    getLimitedProducts,
    getProduct,
    searchProduct,
    inventoryStats,
    productPagination
};
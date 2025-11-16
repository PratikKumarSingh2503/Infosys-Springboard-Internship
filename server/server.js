const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./utils/connectDB');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const cron = require('node-cron');

const app = express();

// Configure CORS to accept multiple origins for production and development
const allowedOrigins = [
    'http://localhost:5173', // Local development
    'https://infosys-springboard-internship-7hn9.vercel.app', // Production Vercel URL
    process.env.CLIENT_URL // Additional URL from env variable
].filter(Boolean); // Remove any undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Allow any Vercel deployment (preview deployments use different URLs)
            if (origin.includes('vercel.app')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true // Required for cookies to be sent cross-origin
}));

connectDB(process.env.DB_CONN_STRING);

const Order = require('./models/orders.schema');
const Notification = require('./models/notifications.schema');

cron.schedule('39 13 * * *', async () => {

    try {

        const dateTime = new Date();
        const Todaydate = dateTime.toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)
        const todayDeliveryOrders = await Order.find({ expectedDelivery: Todaydate, status: 'Confirmed' });
        if (todayDeliveryOrders.length > 0) {
            // Use Promise.all to properly await all async operations
            await Promise.all(todayDeliveryOrders.map(async (order) => {
                await Notification.create({ orderId: order._id });
            }));
        }
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});


const userRoute = require('./routes/user.route');
const SupplierRoute = require('./routes/supplier.route');
const orderRoute = require('./routes/order.route');
const ProductsRoute = require('./routes/product.route');
const NotificationRoute = require('./routes/notifications.route');
const SalesRoute = require('./routes/sales.route');
const DashboardRoute = require('./routes/dashboard.route');
const ReportRoute = require('./routes/report.route');
const authenticateUser = require('./middlewares/authenticateUser');
const authorizeAdmin = require('./middlewares/authorizeAdmin');
const cookieParser = require('cookie-parser');


app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitizer());
app.use(xss());
// Configure Helmet to allow credentials (cookies) for cross-origin requests
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false
}));

app.get('/', (req, res) => {
    return res.send('welcome');
});



app.use("/api/users", userRoute);
app.use("/api/supplier", authenticateUser, SupplierRoute);
app.use("/api/order", authenticateUser, orderRoute);
app.use("/api/product", authenticateUser, ProductsRoute);
app.use("/api/notifications", authenticateUser, NotificationRoute);
app.use("/api/sales", authenticateUser, SalesRoute);
app.use("/api/dashboard", authenticateUser, authorizeAdmin, DashboardRoute);
app.use("/api/report", authenticateUser, authorizeAdmin, ReportRoute);

app.listen(process.env.PORT, () => console.log(`server started on port no. ${process.env.PORT}`));
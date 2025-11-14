# StockSync - Inventory Management System


## Overview

StockSync is a comprehensive MERN stack-based inventory management system designed to streamline inventory tracking, supplier management, order processing, and sales monitoring for businesses of all sizes. It provides real-time stock updates, role-based access control, and automated order tracking to ensure smooth and secure business operations.

## Purpose

The primary goal of StockSync is to provide an easy-to-use and automated inventory management solution that helps businesses:

- **Reduce Manual Errors** by automating inventory tracking
- **Improve Business Efficiency** in order management and supplier coordination
- **Support Better Decision-Making** with real-time data visualization
- **Ensure Secure Access** through role-based authentication
- **Optimize Stock Levels** with intelligent alerts for low-stock and order updates

## Technology Stack

### Frontend
- **React.js** - UI library for building the user interface
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Context API** - For state management
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - ODM library for MongoDB
- **JWT** - For secure authentication
- **Nodemailer** - For email notifications

## Key Features

### User Authentication & Management
- Secure registration and login with JWT
- Password reset functionality
- Role-based access control (Admin & User)

### Inventory Management
- Add, update, delete, and track products in real-time
- Low-stock alerts to prevent stockouts
- Category-based product organization

### Supplier Management
- Maintain comprehensive supplier records
- Monitor deliveries and supplier-related data
- Track supplier performance

### Order Processing & Tracking
- Order status updates (Confirmed, Delivered, Returned, Delayed)
- Expected delivery date tracking
- Order history and analytics

### Sales Management
- Record sales and track category-wise turnover
- Automatic stock level updates upon sale
- Sales performance reporting

### Dashboard & Analytics
- Real-time graphical insights on sales and purchases
- Inventory levels and performance metrics
- Top-selling and low-stock product monitoring

### Shop & Order Placement
- User-friendly product browsing experience
- Simplified order placement process
- Cart management and checkout

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud-hosted like MongoDB Atlas)
- IDE (like Visual Studio Code)

### Installation

1. Clone the repository
```bash
git clone https://github.com/springboardmentor106/InventoryManagement_Infosys_Internship_Feb2025_Team_03.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory of the backend with the following:
```
PORT=5000
DB_CONN_STRING=mongodb://127.0.0.1:27017/stocksync
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
MY_EMAIL=your-email@example.com
MY_MAIL_PASSWORD=your-email-password
```

### Running the Application

1. Start the backend
```bash
cd server
npm run dev
```

2. Start the frontend
```bash
cd client
npm run dev
```

3. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
StockSync/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── api/             # API integration functions
│   │   ├── assets/          # Static files
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context for state management
│   │   ├── pages/           # Page components
│   │   └── routes/          # Application routing
├── server/                  # Backend Node.js application
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── utils/               # Utility functions
└── README.md                # Project documentation
```

## API Documentation

The StockSync API provides endpoints for:
- User authentication and profile management
- Inventory and product management
- Supplier management
- Order processing
- Sales recording and analytics
- Dashboard data

For detailed API documentation, refer to the project documentation or explore the `/server/routes` directory.

## User Roles

### Admin
- Full access to all system functionalities
- Dashboard, inventory, and supplier management
- Order processing and analytics

### User
- Access to the shop page
- Ability to place orders
- Limited functionality compared to Admin

## Error Handling and Troubleshooting

Common issues and their solutions:
- Email notification failures
- Port conflicts
- Database connection issues
- Authentication errors

For detailed troubleshooting steps, please refer to the project documentation.

## Future Enhancements

- Predictive inventory management using machine learning
- Native mobile applications for iOS and Android
- Barcode/QR scanner integration
- Automated purchase orders
- Enhanced analytics and reporting

## Contributors

- Team 03 - Infosys SpringBoard Internship, Feb 2025

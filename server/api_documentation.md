# User API Documentation

## Base URL
`/api/users/`

## Endpoints

### 1. Register a User
**Endpoint:** `POST /register`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "password": "SecurePass123",
  "phoneNumber": "1234567890",
  "address": "123 Street, City, Country"
}
```

**Response:**
```json
{
  "message": "User created"
}
```

---

### 2. Login
**Endpoint:** `POST /login`

**Description:** Authenticates a user and returns a token.

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "fullname": "John Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "1234567890",
    "address": "123 Street, City, Country"
  }
}
```

---

### 3. Forgot Password
**Endpoint:** `POST /forgot-password`

**Description:** Sends a password reset email.

**Request Body:**
```json
{
  "email": "johndoe@example.com"
}
```

**Response:**
```json
{
  "message": "Email Sent Successfully!"
}
```

---

### 4. Reset Password
**Endpoint:** `POST /reset-password/:token`

**Description:** Resets the user's password.

**Request Body:**
```json
{
  "password": "NewSecurePass123"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

---

### 5. Edit Profile
**Endpoint:** `POST /editProfile`

**Description:** Updates user profile (requires authentication).

**Headers:**
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullname": "John Updated",
  "phoneNumber": "9876543210",
  "address": "456 New Street, City, Country"
}
```

**Response:**
```json
{
  "message": "User updated",
  "token": "new-jwt-token"
}
```

---

### 6. Get User Details
**Endpoint:** `GET /getUser`

**Description:** Retrieves user details (requires authentication).

**Headers:**
`Authorization: Bearer <token>`

**Response:**
```json
{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "phoneNumber": "1234567890",
  "address": "123 Street, City, Country",
  "admin": false
}
```

---

## User Schema
```json
{
  "fullname": "String (min 3 characters)",
  "email": "String (unique)",
  "password": "String",
  "salt": "String",
  "profilePic": "String (default: '/images/man_5-1024.webp')",
  "phoneNumber": "String",
  "address": "String",
  "resetPasswordToken": "String",
  "resetPasswordTimeout": "Date",
  "admin": "Boolean (default: false)"
}
```

# Supplier API Documentation

## Base URL
`/api/supplier/`

## Endpoints

### 1. Get Suppliers
**Endpoint:** `GET /getSuppliers`

**Description:** Retrieves a paginated list of suppliers (Admin only).

**Headers:**
`Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional, default: 1) - The page number.
- `limit` (optional, default: 10) - Number of suppliers per page.

**Response:**
```json
{
  "suppliers": [
    {
      "name": "Supplier Name",
      "product": "Product Name",
      "category": "Category Name",
      "contact": "1234567890",
      "email": "supplier@example.com",
      "type": "Type",
      "onTheWay": 0,
      "supplierImage": "image_url",
      "supplierId": "abcd1234"
    }
  ],
  "currentPage": 1,
  "totalPages": 5,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

---

### 2. Add Supplier
**Endpoint:** `POST /addSupplier`

**Description:** Adds a new supplier (Admin only).

**Headers:**
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Supplier Name",
  "product": "Product Name",
  "category": "Category Name",
  "contact": "1234567890",
  "email": "supplier@example.com",
  "type": "Type",
  "supplierImage": "image_url"
}
```

**Response:**
```json
{
  "message": "Supplier added!",
  "supplier": {
    "name": "Supplier Name",
    "product": "Product Name",
    "category": "Category Name",
    "contact": "1234567890",
    "email": "supplier@example.com",
    "type": "Type",
    "supplierImage": "image_url",
    "supplierId": "abcd1234"
  }
}
```

---

## Supplier Schema
```json
{
  "name": "String (required)",
  "product": "String",
  "category": "String",
  "contact": "String (required)",
  "email": "String (unique, required)",
  "type": "String (required)",
  "onTheWay": "Number (default: 0)",
  "supplierImage": "String",
  "supplierId": "String (unique, required)"
}
```

# Order API Documentation

## Base URL
`/api/order`

## Endpoints

### 1. Place an Order

**URL:** `/placeOrder`

**Method:** `POST`

**Authorization:** Admin required

**Request Body:**
```json
{
    "name": "Product Name",
    "supplierId": "supplier1234",
    "category": "Electronics",
    "quantity": 10,
    "unit": "pcs",
    "orderValue": 5000,
    "expectedDelivery": "2025-03-20",
    "productImage": "url-to-image"
}
```

**Response:**
- `201 Created`: Order placed successfully
- `400 Bad Request`: Supplier not found or invalid data
- `500 Internal Server Error`: Something went wrong

---

### 2. Get Orders

**URL:** `/getOrders`

**Method:** `GET`

**Query Parameters:**
- `page` (optional, default: `1`)
- `limit` (optional, default: `10`)

**Response:**
```json
{
    "orders": [ {...orderData} ],
    "currentPage": 1,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
}
```

**Status Codes:**
- `200 OK`: Returns list of orders
- `500 Internal Server Error`: Issue retrieving orders

---

### 3. Get Overall Order Statistics

**URL:** `/overAllOrders`

**Method:** `GET`

**Response:**
```json
{
    "totalOrders": 100,
    "totalReceived": 80,
    "totalReturned": 5,
    "totalOnTheWay": 15,
    "totalReceivedCost": 400000,
    "totalReturnedCost": 25000,
    "totalOnTheWayCost": 75000
}
```

**Status Codes:**
- `200 OK`: Returns order statistics
- `500 Internal Server Error`: Issue retrieving data

---

## Order Schema

```json
{
    "name": "Product Name",
    "supplierId": "supplier1234",
    "category": "Electronics",
    "quantity": 10,
    "unit": "pcs",
    "orderValue": 5000,
    "expectedDelivery": "2025-03-20",
    "status": "Confirmed | Delivered | Returned | Delayed"
}
```

Let me know if you need any modifications! 🚀

# Product API Documentation

## Base URL
```
/api/product
```

## Endpoints

### 1. Get All Products
**URL:** `/getproducts`
- **Method:** `GET`
- **Description:** Fetch all products.
- **Response:**
  ```json
  [
    {
      "_id": "product_id",
      "name": "Product Name",
      "category": "Category Name",
      "cost": 100,
      "sellingPrice": 120,
      "unit": "kg",
      "productImage": "image_url",
      "qtySold": 50,
      "qtyRemaining": 20
    }
  ]
  ```

### 2. Get Top Selling Products
**URL:** `/getTopSellingProducts`
- **Method:** `GET`
- **Description:** Get the top 4 best-selling products.

### 3. Get Products By Category
**URL:** `/getProductsByCateogory`
- **Method:** `GET`
- **Query Params:** `category`
- **Description:** Fetch products by category.

### 4. Get Limited Products
**URL:** `/getLimitedProducts`
- **Method:** `GET`
- **Description:** Fetch up to 8 products.

### 5. Search Product
**URL:** `/searchProduct`
- **Method:** `GET`
- **Query Params:** `search`
- **Description:** Search for products by name or category.

### 6. Get Inventory Stats
**URL:** `/inventoryStats`
- **Method:** `GET`
- **Description:** Fetch inventory statistics.

### 7. Product Pagination
**URL:** `/productPagination`
- **Method:** `GET`
- **Query Params:** `page`, `limit`
- **Description:** Fetch paginated products.

### 8. Get Products By ID List
**URL:** `/getProductsByIdsList`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "productIds": ["id1", "id2"]
  }
  ```
- **Description:** Fetch multiple products by their IDs.

### 9. Get Single Product
**URL:** `/getProduct/:id`
- **Method:** `GET`
- **Description:** Fetch a single product by ID.
- **Response:**
  ```json
  {
    "_id": "product_id",
    "name": "Product Name",
    "category": "Category Name",
    "cost": 100,
    "sellingPrice": 120,
    "unit": "kg",
    "productImage": "image_url",
    "qtySold": 50,
    "qtyRemaining": 20
  }
  ```

## Error Handling
- `400` - Bad Request (Invalid parameters or request body)
- `500` - Internal Server Error (Database or server issues)

## Notes
- The API is protected using authentication middleware.
- Only authorized users can access these endpoints.

### Schema
**Product Model:**
```json
{
  "name": "string",
  "category": "string",
  "cost": "number",
  "sellingPrice": "number",
  "unit": "string",
  "productImage": "string",
  "qtySold": "number",
  "qtyRemaining": "number",
  "thresholdValue": "number"
}
```

# 📌 Notification API Documentation
**Base URL:** `/api/notifications`

---

## 1⃣ Get Notifications  
**📌 Endpoint:** `GET /api/notifications/getNotifications`  
**🔑 Authorization:** `Admin Required`  

### 👅 Request
```http
GET /api/notifications/getNotifications HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <your-token>
```

### 👤 Response (Success - 200)
```json
[
    {
        "_id": "66234abcd1234ef567890xyz",
        "orderId": {
            "_id": "66123abcde4567ef890xyz",
            "name": "Laptop",
            "category": "Electronics",
            "quantity": 10,
            "orderValue": 50000,
            "expectedDelivery": "2025-03-15",
            "supplierId": "6609876543210abcd"
        },
        "createdAt": "2025-03-10T12:00:00Z",
        "updatedAt": "2025-03-10T12:00:00Z"
    }
]
```

### 👤 Response (Error - 500)
```json
{
    "message": "Internal server error"
}
```

---

## 2⃣ Mark Order as Delivered  
**📌 Endpoint:** `POST /api/notifications/delivered`  
**🔑 Authorization:** `Admin Required`  

### 👅 Request
```http
POST /api/notifications/delivered HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <your-token>
Content-Type: application/json
```
```json
{
    "_id": "66234abcd1234ef567890xyz",
    "orderId": {
        "_id": "66123abcde4567ef890xyz",
        "supplierId": "6609876543210abcd"
    }
}
```

### 👤 Response (Success - 200)
```json
{
    "success": true
}
```

### 👤 Response (Error - 404)
```json
{
    "message": "Order not found"
}
```

### 👤 Response (Error - 500)
```json
{
    "message": "Internal server error"
}
```

---

## 3⃣ Mark Order as Delayed  
**📌 Endpoint:** `POST /api/notifications/delay`  
**🔑 Authorization:** `Admin Required`  

### 👅 Request
```http
POST /api/notifications/delay HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <your-token>
Content-Type: application/json
```
```json
{
    "orderId": {
        "_id": "66123abcde4567ef890xyz"
    }
}
```

### 👤 Response (Success - 200)
```json
{
    "success": true
}
```

### 👤 Response (Error - 404)
```json
{
    "message": "Order not found"
}
```

### 👤 Response (Error - 500)
```json
{
    "message": "Internal server error"
}
```

---

## 4⃣ Mark Order as Returned  
**📌 Endpoint:** `POST /api/notifications/returned`  
**🔑 Authorization:** `Admin Required`  

### 👅 Request
```http
POST /api/notifications/returned HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <your-token>
Content-Type: application/json
```
```json
{
    "_id": "66234abcd1234ef567890xyz",
    "orderId": {
        "_id": "66123abcde4567ef890xyz",
        "name": "Laptop",
        "category": "Electronics",
        "quantity": 10,
        "supplierId": "6609876543210abcd"
    }
}
```

### 👤 Response (Success - 200)
```json
{
    "success": true
}
```

### 👤 Response (Error - 500)
```json
{
    "message": "Internal server error"
}
```

# Sales API Documentation

## Base URL
```
/api/sales
```

## Middleware
- `authenticateUser`: Ensures only authenticated users can access sales routes.

## Endpoints

### Record Sales
**Endpoint:**
```
POST /api/sales/recordSales
```
**Description:**
Records a list of sales transactions, updates product stock, category turnover, and sales records.

**Request Body:**
```json
{
  "sales": [
    {
      "_id": "product_id",
      "category": "category_name",
      "name": "product_name",
      "quantity": 5
    }
  ]
}
```

**Response:**
- **200 OK**
  ```json
  {
    "success": true,
    "message": "Sales recorded successfully"
  }
  ```
- **400 Bad Request** (Invalid or missing sales data)
  ```json
  {
    "success": false,
    "message": "Invalid sales data"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Server error",
    "error": "Error details"
  }
  ```

## Database Models

### Sales Schema
```javascript
const salesSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    turnOver: {
        type: Number,
        default: 0,
    },
    preTurnOver: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
```

### Functionality
- Deducts sold quantity from `Product.qtyRemaining` and increases `Product.qtySold`.
- Updates `Category.turnOver` and `Sales.turnOver`.
- Ensures previous turnover (`preTurnOver`) is stored before updating current turnover.

## Notes
- If a product or category does not exist, a new record is created.
- `qtyRemaining` is never negative; it stops at 0 if sales exceed available stock.
- Logs missing products instead of failing the entire transaction.

---
_Last updated: March 2025_

# Sales API Documentation

## Base URL
```
/api/sales
```

## Middleware
- `authenticateUser`: Ensures only authenticated users can access sales routes.

## Endpoints

### Record Sales
**Endpoint:**
```
POST /api/sales/recordSales
```
**Description:**
Records a list of sales transactions, updates product stock, category turnover, and sales records.

**Request Body:**
```json
{
  "sales": [
    {
      "_id": "product_id",
      "category": "category_name",
      "name": "product_name",
      "quantity": 5
    }
  ]
}
```

**Response:**
- **200 OK**
  ```json
  {
    "success": true,
    "message": "Sales recorded successfully"
  }
  ```
- **400 Bad Request** (Invalid or missing sales data)
  ```json
  {
    "success": false,
    "message": "Invalid sales data"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Server error",
    "error": "Error details"
  }
  ```

## Database Models

### Sales Schema
```javascript
const salesSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    turnOver: {
        type: Number,
        default: 0,
    },
    preTurnOver: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
```

### Functionality
- Deducts sold quantity from `Product.qtyRemaining` and increases `Product.qtySold`.
- Updates `Category.turnOver` and `Sales.turnOver`.
- Ensures previous turnover (`preTurnOver`) is stored before updating current turnover.

## Notes
- If a product or category does not exist, a new record is created.
- `qtyRemaining` is never negative; it stops at 0 if sales exceed available stock.
- Logs missing products instead of failing the entire transaction.

---
_Last updated: March 2025_

# Dashboard API Documentation

## Base URL
```
/api/dashboard
```

## Authentication & Authorization
- Requires authentication (`authenticateUser` middleware)
- Requires admin authorization (`authorizeAdmin` middleware)

---

## **1. Sales Overview**
### **Endpoint:**
```
GET /salesOverview
```
### **Description:**
Provides an overview of total sales, revenue, profit, and incurred costs.
### **Response:**
```json
{
  "totalSales": 1500,
  "totalRevenue": 500000,
  "totalProfit": 100000,
  "totalCostIncurred": 400000
}
```

---

## **2. Inventory Summary**
### **Endpoint:**
```
GET /InventorySummary
```
### **Description:**
Provides an overview of stock quantities in hand and pending incoming orders.
### **Response:**
```json
{
  "quantityInHand": 1200,
  "quantityToBeReceived": 500
}
```

---

## **3. Purchase Overview**
### **Endpoint:**
```
GET /purchaseOverview
```
### **Description:**
Summarizes purchase details, including the total number of purchases, cost of delivered and returned orders.
### **Response:**
```json
{
  "totalPurchases": 200,
  "totalCostDelivered": 150000,
  "totalCostReturned": 20000
}
```

---

## **4. Product Summary**
### **Endpoint:**
```
GET /productSummary
```
### **Description:**
Provides the count of unique suppliers and product categories.
### **Response:**
```json
{
  "totalUniqueSuppliers": 30,
  "totalUniqueCategories": 15
}
```

---

## **5. Sales and Purchases (Monthly Data)**
### **Endpoint:**
```
GET /salesAndPurchases
```
### **Description:**
Returns monthly sales and purchase amounts.
### **Response:**
```json
[
  { "month": "Jan", "Sales": 50000, "Purchase": 30000 },
  { "month": "Feb", "Sales": 45000, "Purchase": 35000 }
]
```

---

## **6. Order Summary (Monthly Data)**
### **Endpoint:**
```
GET /orderSummary
```
### **Description:**
Returns monthly ordered and delivered quantities.
### **Response:**
```json
[
  { "month": "Jan", "Ordered": 200, "Delivered": 180 },
  { "month": "Feb", "Ordered": 250, "Delivered": 240 }
]
```

---

## **7. Top Selling Stock**
### **Endpoint:**
```
GET /topSellingStock
```
### **Description:**
Fetches the top 3 best-selling products.
### **Response:**
```json
[
  { "name": "Product A", "qtySold": 500, "qtyRemaining": 200, "sellingPrice": 100 },
  { "name": "Product B", "qtySold": 450, "qtyRemaining": 150, "sellingPrice": 120 }
]
```

---

## **8. Low Quantity Stock**
### **Endpoint:**
```
GET /lowQuantityStock
```
### **Description:**
Fetches the top 3 products with the lowest remaining stock (<= 10 units).
### **Response:**
```json
[
  { "name": "Product X", "qtyRemaining": 5, "productImage": "image_url" },
  { "name": "Product Y", "qtyRemaining": 8, "productImage": "image_url" }
]
```

---

## **Error Responses**
For all endpoints, common error responses include:

### **400 Bad Request:**
```json
{
  "message": "Invalid request data"
}
```

### **404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

### **500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```

# Inventory Management System API Documentation

## **Authentication & Authorization**
All routes under `/api/dashboard` and `/api/report` require user authentication and admin authorization.

---

## **Dashboard API Routes**

### **1. Sales Overview**
**Endpoint:** `GET /api/dashboard/salesOverview`

**Response:**
```json
{
  "totalSales": number,
  "totalRevenue": number,
  "totalProfit": number,
  "totalCostIncurred": number
}
```

---

### **2. Inventory Summary**
**Endpoint:** `GET /api/dashboard/InventorySummary`

**Response:**
```json
{
  "quantityInHand": number,
  "quantityToBeReceived": number
}
```

---

### **3. Purchase Overview**
**Endpoint:** `GET /api/dashboard/purchaseOverview`

**Response:**
```json
{
  "totalPurchases": number,
  "totalCostDelivered": number,
  "totalCostReturned": number
}
```

---

### **4. Product Summary**
**Endpoint:** `GET /api/dashboard/productSummary`

**Response:**
```json
{
  "totalUniqueSuppliers": number,
  "totalUniqueCategories": number
}
```

---

### **5. Sales and Purchases (MoM)**
**Endpoint:** `GET /api/dashboard/salesAndPurchases`

**Response:**
```json
[
  {
    "month": "Jan",
    "Sales": number,
    "Purchase": number
  }
]
```

---

### **6. Order Summary (MoM)**
**Endpoint:** `GET /api/dashboard/orderSummary`

**Response:**
```json
[
  {
    "month": "Jan",
    "Ordered": number,
    "Delivered": number
  }
]
```

---

### **7. Top Selling Stock**
**Endpoint:** `GET /api/dashboard/topSellingStock`

**Response:**
```json
[
  {
    "name": "string",
    "qtySold": number,
    "qtyRemaining": number,
    "sellingPrice": number
  }
]
```

---

### **8. Low Quantity Stock**
**Endpoint:** `GET /api/dashboard/lowQuantityStock`

**Response:**
```json
[
  {
    "name": "string",
    "productImage": "string",
    "qtyRemaining": number
  }
]
```

---

## **Reports API Routes**

### **1. Overview**
**Endpoint:** `GET /api/report/overview`

**Response:**
```json
{
  "totalProfit": number,
  "totalRevenue": number,
  "totalSales": number,
  "netPurchaseValue": number,
  "momProfit": number,
  "yoyProfit": number
}
```

---

### **2. Best Selling Category**
**Endpoint:** `GET /api/report/bestSellingCategory`

**Response:**
```json
[
  {
    "category": "string",
    "turnover": number,
    "preTurnOver": number
  }
]
```

---

### **3. Profit and Revenue (MoM)**
**Endpoint:** `GET /api/report/profitAndRevenue`

**Response:**
```json
[
  {
    "month": "Jan",
    "revenue": number,
    "profit": number
  }
]
```

---

### **4. Best Selling Product**
**Endpoint:** `GET /api/report/bestSellingProduct`

**Response:**
```json
[
  {
    "name": "string",
    "productId": "string",
    "category": "string",
    "qtyRemaining": number,
    "turnover": number
  }
]
```

---


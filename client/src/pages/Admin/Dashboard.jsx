import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import BarGraph from "../../components/BarGraph";
import OrderSummaryChart from "../../components/OrderSummaryChart ";
import { useParams } from "react-router-dom";
import { storage } from "../../appwrite.config";
import sales from "../../assets/dashboard/Sales.png";
import revenue from "../../assets/dashboard/Revenue.png";
import profit from "../../assets/dashboard/Profit.png";
import cost from "../../assets/dashboard/Cost.png";
import purchase from "../../assets/dashboard/Purchase.png";
import quantity from "../../assets/dashboard/Quantity.png";
import onway from "../../assets/dashboard/Onway.png";
import suppliers from "../../assets/dashboard/Suppliers.png";
import categories from "../../assets/dashboard/Categories.png";

const Dashboard = () => {
  const [salesOverview, setsalesOverview] = useState(null);
  const [inventorySummary, setinventorySummary] = useState([]);
  const [purchaseOverview, setpurchaseOverview] = useState([]);
  const [productSummary, setproductSummary] = useState([]);
  const [topSellingStock, settopSellingStock] = useState([]);
  const [lowQuantityStock, setlowQuantityStock] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const salesoverviewRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/salesOverview`,
          { withCredentials: true }
        );
        const inventorysummaryRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/InventorySummary`,
          { withCredentials: true }
        );
        const purchaseoverviewRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/purchaseOverview`,
          { withCredentials: true }
        );
        const productsummaryRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/productSummary`,
          { withCredentials: true }
        );
        const topsellingstockRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/topSellingStock`,
          { withCredentials: true }
        );
        const lowquantitystockRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/lowQuantityStock`,
          { withCredentials: true }
        );
        const updatedLowStock = lowquantitystockRes.data.map((product) => {
          let imageUrl = null;
          if (product.productImage) {
            try {
              imageUrl = storage
                .getFilePreview(
                  import.meta.env.VITE_APPWRITE_BUCKET_ID,
                  product.productImage // AppWrite file ID
                )
                .toString();
            } catch (error) {
              console.error('Error loading product image:', error);
            }
          }
          return {
            ...product,
            imageUrl,
          };
        });

        setsalesOverview(salesoverviewRes.data);
        setinventorySummary(inventorysummaryRes.data);
        setpurchaseOverview(purchaseoverviewRes.data);
        setproductSummary(productsummaryRes.data);
        settopSellingStock(topsellingstockRes.data);
        // setlowQuantityStock(lowquantitystockRes.data);
        setlowQuantityStock(updatedLowStock);
      } catch (error) {
        console.error("Error fetching low stock products:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="py-6">
        <div className="mx-20 flex gap-10">
          {salesOverview && (
            <div className="flex-5 p-4 border-1 border-theme rounded-lg shadow-xl bg-card">
              <h2 className="text-xl font-medium mb-4 text-[#383E49] ">
                Sales Overview
              </h2>
              <div className="flex flex-col px-4 gap-10">
                <div className="flex gap-4 p-2 justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <img src={sales} />
                    <p className="[word-spacing:20px]">
                      {salesOverview.totalSales} Sales
                    </p>
                    {/* <h3>Sales</h3> */}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <img src={revenue} />
                    <p className="[word-spacing:20px]">
                      ₹{salesOverview.totalRevenue} Revenue
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <img src={profit} />
                    <p className="[word-spacing:20px]">
                      {salesOverview.totalProfit} Profit
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <img src={cost} />
                    <p className="[word-spacing:20px]">
                      {salesOverview.totalCostIncurred} Cost
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {inventorySummary && (
            <div className="flex-3 p-4 border-1 border-theme rounded-lg shadow-xl bg-card">
              <h2 className="text-xl font-medium mb-4 text-[#383E49] ">
                Inventory Summary
              </h2>
              <div className="flex flex-col gap-10">
                <div className="flex gap-4 p-2 justify-between text-center">
                  <div className="flex flex-col items-center">
                    <img src={quantity} />
                    <p>{inventorySummary.quantityInHand}</p>
                    <p>Quantity in hands</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={onway} />
                    <p>{inventorySummary.quantityToBeReceived}</p>
                    <p>To be recieved</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-20 mt-12 flex gap-10">
          {purchaseOverview && (
            <div className="flex-5 p-4 border-1 border-theme rounded-lg shadow-xl bg-card">
              <h2 className="text-xl font-medium mb-4 text-[#383E49] ">
                Purchase Overview
              </h2>
              <div className="flex flex-col px-4 gap-10">
                <div className="flex gap-4 p-2 justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <img src={purchase} />
                    <p className="[word-spacing:20px]">
                      {purchaseOverview.totalPurchases} Purchase
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <img src={cost} />
                    <p className="[word-spacing:20px]">
                      ₹{purchaseOverview.totalCostDelivered} Cost
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <img src={profit} />
                    <p className="[word-spacing:20px]">
                      {purchaseOverview.totalCostReturned} Return
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {productSummary && (
            <div className="flex-3 p-4 border-1 border-theme rounded-lg shadow-xl bg-card">
              <h2 className="text-xl font-medium mb-4 text-[#383E49] ">
                Product Summary
              </h2>
              <div className="flex flex-col gap-10">
                <div className="flex gap-4 p-2 justify-between text-center">
                  <div className="flex flex-col items-center">
                  <img src={suppliers} />
                    <p>{productSummary.totalUniqueSuppliers}</p>
                    <p>Number of Suppliers</p>
                  </div>
                  <div className="flex flex-col items-center">
                  <img src={categories} />
                    <p>{productSummary.totalUniqueCategories}</p>
                    <p>Numbers of Categories</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mx-20 mt-12 flex gap-10">
          <div className="flex-5 p-4 border-1 border-theme rounded-lg shadow-xl bg-card">
            <BarGraph />
          </div>
          <div className="flex-3 p-4 border-1 border-theme rounded-lg shadow-xl">
            <OrderSummaryChart />
          </div>
        </div>
        <div className="mx-20 mt-12 flex gap-10">
          <div className="flex-5 p-4 border-1 border-theme rounded-lg shadow-xl bg-card">
            <h2 className="text-2xl font-medium mb-4 text-[#383E49]">
              Top Selling Stock
            </h2>
            <table className="w-full border-collapse text-gray-700">
              <thead>
                <tr className="">
                  <th className="border-b border-gray-300 p-3 text-left">
                    Name
                  </th>
                  <th className="border-b border-gray-300 p-3 text-left">
                    Sold Quantity
                  </th>
                  <th className="border-b border-gray-300 p-3 text-left">
                    Remaining Quantity
                  </th>
                  <th className="border-b border-gray-300 p-3 text-left">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingStock.map((product, index) => (
                  <tr key={index} className="">
                    <td className="p-3 border-b border-gray-300">
                      {product.name}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {product.qtySold}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {product.qtyRemaining}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      ₹{product.sellingPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-3 p-4 border-1 border-theme rounded-lg shadow-xl bg-white">
            <h2 className="text-2xl font-medium mb-4 text-[#383E49]">
              Low Quantity Stock
            </h2>
            <table className="w-full border-collapse text-gray-700">
              <tbody>
                {lowQuantityStock.map((product, index) => (
                  <tr key={index} className="">
                    <td className="p-3 border-b border-gray-300">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-16 w-16"
                      />
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {product.name}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {product.qtyRemaining}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

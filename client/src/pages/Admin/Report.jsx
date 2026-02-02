import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfitRevenueChart from "../../components/ProfitRevenueChart";

const Reports = () => {
  const [overview, setOverview] = useState(null);
  const [bestCategories, setBestCategories] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const overviewRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/report/overview`,
          { withCredentials: true }
        );
        const categoryRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/report/bestSellingCategory`,
          { withCredentials: true }
        );
        const productRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/report/bestSellingProduct`,
          { withCredentials: true }
        );

        setOverview(overviewRes.data);
        setBestCategories(categoryRes.data);
        setBestProducts(productRes.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="py-6">
      {/* Overview Section */}
      <div className="mx-20 flex gap-10">
        {overview && (
          <div className="flex-1 p-4 border-1 border-theme rounded-lg shadow-xl">
            <h2 className="text-2xl font-medium mb-4 text-[#383E49]">
              Overview
            </h2>
            <div className="flex flex-col gap-10">
              <div className="flex gap-4 p-2 pb-8 border-b border-gray-300 justify-between">
                <div className="">
                  <p>₹{overview.totalProfit}</p>
                  <h3>Total Profit</h3>
                </div>
                <div className="">
                  <p>₹{overview.totalRevenue}</p>
                  <h3 className="text-[#DBA362]">Revenue</h3>
                </div>
                <div className="">
                  <p className="">{overview.totalSales} items</p>
                  <h3 className="text-[#845EBC] ">Sales</h3>
                </div>
              </div>
              <div className="flex gap-4 p-2 justify-between">
                <div className="">
                  <p className="">₹{overview.netPurchaseValue}</p>
                  <h3 className="">Net Purchase Value</h3>
                </div>
                <div className="">
                  <p className="">₹{overview.momProfit}</p>
                  <h3 className="">MoM Profit</h3>
                </div>
                <div className="">
                  <p className="">₹{overview.yoyProfit}</p>
                  <h3 className="">YoY Profit</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Best Selling Categories Section */}
        <div className="flex-1 p-6 border-1 border-theme rounded-lg shadow-xl bg-white">
          <h2 className="text-2xl font-medium mb-4 text-[#383E49]">
            Best Selling Category
          </h2>
          <table className="w-full border-collapse text-gray-700">
            <thead>
              <tr className="">
                <th className="border-b border-gray-300 p-3 text-left">
                  Category
                </th>
                <th className="border-b border-gray-300 p-3 text-left">
                  Turn Over
                </th>
              </tr>
            </thead>
            <tbody>
              {bestCategories.map((category, index) => (
                <tr key={index} className="">
                  <td className="p-3 border-b border-gray-300">
                    {category.category}
                  </td>
                  <td className="p-3 border-b border-gray-300">
                    ₹{category.turnover}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profit & Revenue Chart */}
      <div className="mx-20 mt-12 p-6 border-1 border-theme rounded-lg shadow-xl bg-white">
        <h2 className="text-2xl font-medium mb-4 text-[#383E49]">
          Profit & Revenue
        </h2>
        <ProfitRevenueChart />
      </div>

      {/* Best Selling Products Section */}
      <div className="mx-20 mt-12 p-6 border-1 border-theme rounded-lg shadow-xl bg-white">
        <h2 className="text-2xl font-medium mb-4 text-[#383E49]">
          Best Selling Product
        </h2>
        <table className="w-full border-collapse borde border-gray-200 text-gray-700">
          <thead>
            <tr className="">
              <th className="border-b border-gray-300 p-3 text-left">
                Product
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                Product ID
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                Category
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                Remaining Quantity
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                Turn Over
              </th>
            </tr>
          </thead>
          <tbody>
            {bestProducts.map((product, index) => (
              <tr key={index} className="">
                <td className="p-3 border-b border-gray-300">{product.name}</td>
                <td className="p-3 border-b border-gray-300">
                  {product.productId}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.category}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {product.qtyRemaining} {product.unit}
                </td>
                <td className="p-3 border-b border-gray-300">
                  ₹{product.turnover}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

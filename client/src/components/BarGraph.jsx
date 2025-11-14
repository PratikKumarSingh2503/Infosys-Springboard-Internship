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

const BarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/dashboard/salesAndPurchases`,
          { withCredentials: true }
        );
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching sales-purchase data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
        <div className="p-4">
          <h2 className="text-2xl font-medium mb-4 text-[#383E49]">Sales & Purchase</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Purchase" fill="#70a1ff" />
              <Bar dataKey="Sales" fill="#2ed573" />
            </BarChart>
          </ResponsiveContainer>
        </div>
    </>
  );
};

export default BarGraph;

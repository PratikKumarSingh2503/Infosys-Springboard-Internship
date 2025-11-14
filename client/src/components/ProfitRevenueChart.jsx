import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProfitRevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/report/profitAndRevenue`, {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

  return (
    <>
        <ResponsiveContainer
          width="100%"
          height={400}
          className=""
        >
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#007bff"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#f4a261"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
    </>
  );
};

export default ProfitRevenueChart;

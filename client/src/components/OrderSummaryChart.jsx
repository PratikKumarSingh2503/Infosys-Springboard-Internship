import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const OrderSummaryChart = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dashboard/orderSummary`, { withCredentials: true });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching order summary data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-medium mb-4 text-[#383E49]">Order Summary</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Ordered" stroke="#A5662D" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Delivered" stroke="#92A8D1" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderSummaryChart;

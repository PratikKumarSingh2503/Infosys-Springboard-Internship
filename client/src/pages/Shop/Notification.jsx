import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    const dispatchAction = (action, notification) => {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/notifications/${action}`, notification, { withCredentials: true })
            .then(() => fetchNotifications()) // Refresh after action
            .catch(err => alert(err?.response?.data?.message || "Something went wrong"));
    };

    const fetchNotifications = () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/notifications/getNotifications`, { withCredentials: true })
            .then(({ data }) => setNotifications(data))
            .catch(err => alert(err?.response?.data?.message || "Something went wrong"));
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (notifications.length === 0) {
        return (
            <div className="w-full mt-10 flex items-center justify-center">
                <p className='text-6xl text-[#383E49]'>Empty</p>
            </div>
        );
    }

    return (
        <>
            {notifications.map(notification => (
                <section key={notification._id} className='flex gap-4 items-center justify-around border-b border-theme p-4'>
                    <div className="flex-1">
                        <p className='text-2xl font-bold'>{notification.orderId?.name || "Unknown"}</p>
                        <p>Quantity: {notification.orderId?.quantity || 0}</p>
                        <p>Order Value: {notification.orderId?.orderValue || 0}</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => dispatchAction('delivered', notification)} className='text-white bg-green-500 rounded px-2 py-1 hover:shadow-lg'>Delivered</button>
                        <button onClick={() => dispatchAction('delay', notification)} className='text-white bg-orange-500 rounded px-2 py-1 hover:shadow-lg'>Delayed</button>
                        <button onClick={() => dispatchAction('returned', notification)} className='text-white bg-red-500 rounded px-2 py-1 hover:shadow-lg'>Return</button>
                    </div>
                </section>
            ))}
        </>
    );
};

export default Notification;

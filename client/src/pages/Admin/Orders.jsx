import { ID } from "appwrite";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../appwrite.config";
import Navbar from "../../components/Navbar";
import { FaImage } from "react-icons/fa";
const overallOrdersModel = {
  totalOrders: 0,
  totalReceived: 0,
  totalReturned: 0,
  totalOnTheWay: 0,
  totalReceivedCost: 0,
  totalReturnedCost: 0,
  totalOnTheWayCost: 0,
};
const newOrderModel = {
  name: "",
  supplierId: "",
  category: "",
  quantity: 0,
  unit: "",
  orderValue: 0,
  expectedDelivery: "",
  productImage: "",
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [overallOrders, setOverallOrders] = useState(overallOrdersModel);
  const [modal, setModal] = useState(false);
  const [newOrder, setNewOrder] = useState(newOrderModel);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/order/getOrders?page=${page}&limit=10`,
        { withCredentials: true }
      )
      .then(({ data }) => {
        axios
          .get(`${import.meta.env.VITE_SERVER_URL}/api/order/overAllOrders`, {
            withCredentials: true,
          })
          .then(({ data }) => {
            setOverallOrders(data);
          });

        setOrders([...data.orders]);
        setTotalPages(data.totalPages);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => alert(message)
      );
  }, [page]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewOrder((value1) => ({ ...value1, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!newOrder.name || !newOrder.supplierId || !newOrder.category || 
        !newOrder.quantity || !newOrder.unit || !newOrder.orderValue || 
        !newOrder.expectedDelivery) {
      alert("Please fill all required fields");
      return;
    }

    // Validate file if provided
    let fileId = "";
    if (file) {
      try {
        const id = ID.unique();
        await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          id,
          file
        );
        fileId = id;
      } catch (error) {
        console.error('File upload error:', error);
        alert("File upload unsuccessful! Please try again.");
        return;
      }
    }
    
    newOrder.productImage = fileId;
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/order/placeOrder`,
        newOrder,
        { withCredentials: true }
      )
      .then(({ data }) => alert(data.message))
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => alert(message)
      );

    setNewOrder(newOrderModel);
    setFile(null);
  };

  return (
    <>
      <div className="py-6">
        <div className="mx-20 p-4 border-1 border-theme min-w-[440px] shadow-xl rounded-lg">
          <h1 className="text-2xl font-medium mb-4 text-[#383E49]">Overall Orders</h1>
          <div className="flex flex-row flex-wrap min-w-[400px] justify-between">
            <div className="flex-1/4 flex p-4 border-e-1 border-gray-500/30">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-myblue">
                  total orders
                </p>
                <p>{overallOrders.totalOrders}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
            </div>
            <div className="flex-1/4 flex p-4 border-e-1 border-gray-500/30">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-myorange">
                  total received
                </p>
                <p>{overallOrders.totalReceived}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
              <div className="flex-1/2  flex gap-2 flex-col">
                <p className="capitalize font-medium text-transparent">
                  total received
                </p>
                <p>{overallOrders.totalReceivedCost}</p>
                <p className="capitalize text-xs text-gray-400">Revenue</p>
              </div>
            </div>
            <div className="flex-1/4 flex p-4 border-e-1 border-gray-500/30">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-theme">
                  total returned
                </p>
                <p>{overallOrders.totalReturned}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
              <div className="flex-1/2  flex gap-2 flex-col">
                <p className="capitalize font-medium text-transparent">
                  total received
                </p>
                <p>{overallOrders.totalReturnedCost}</p>
                <p className="capitalize text-xs text-gray-400">cost</p>
              </div>
            </div>
            <div className="flex-1/4 flex p-4 ">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-myred">
                  being delivered
                </p>
                <p>{overallOrders.totalOnTheWay}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
              <div className="flex-1/2  flex gap-2 flex-col">
                <p className="capitalize font-medium text-transparent">
                  total received
                </p>
                <p>{overallOrders.totalOnTheWayCost}</p>
                <p className="capitalize text-xs text-gray-400">cost</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-20 mt-12 p-4 border-1 border-theme shadow-xl rounded-lg">
          <div className="flex justify-between">
            <p className="text-2xl font-medium mb-4 text-[#383E49]">Orders</p>
            <button
              onClick={() => setModal(true)}
              type="button"
              className="px-4 hover:cursor-pointer hover:drop-shadow-xl  text-md  bg-theme rounded p-1 flex items-center justify-center text-white capitalize"
            >
              Place Order
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <td className="p-2 font-bold">Product</td>
                <td className="p-2 font-bold">Order Value</td>
                <td className="p-2 font-bold">Quantity</td>
                <td className="p-2 font-bold">Order ID</td>
                <td className="p-2 font-bold">Expected Delivery</td>
                <td className="p-2 font-bold">Status</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((odd, index) => (
                <tr
                  className={`${
                    index == orders.length - 1 ? "" : "border-b-[1px]"
                  } border-theme hover:scale-101 hover:bg-theme hover:text-white`}
                  key={odd._id}
                >
                  <td className="p-2">{odd.name}</td>
                  <td className="p-2">{odd.orderValue}</td>
                  <td className="p-2">{odd.quantity}</td>
                  <td className="p-2">{odd._id}</td>
                  <td className="p-2">{odd.expectedDelivery}</td>
                  <td className="p-2">{odd.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between my-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="border-1 px-2 py-1 disabled:cursor-not-allowed disabled:shadow-none disabled:text-slate-300 capitalize rounded hover:cursor-pointer hover:text-theme hover:shadow-xl"
            >
              prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="border-1 px-2 py-1 capitalize disabled:cursor-not-allowed disabled:shadow-none disabled:text-slate-300 rounded hover:cursor-pointer hover:text-theme hover:shadow-xl"
            >
              next
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <div className="w-full h-[680px] absolute top-20 start-0  bg-slate-400/50 backdrop-blur-[3px] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-4">
            <p className="text-lg  mb-4 border-b-1 border-theme p-2">
              New Order
            </p>

            <div className="flex flex-column justify-center gap-3 items-center mb-8">
              <FaImage className="text-purple-500 text-5xl" />
              <div className="ml-5 flex flex-col items-center">
                <p className="text-gray-500">Upload Product Image</p>
                <label
                  htmlFor="productImage"
                  className="flex items-center justify-cente b text-theme hover:text-theme transition cursor-pointer"
                >
                  Browse image
                </label>
              </div>

              <input
                id="productImage"
                type="file"
                className="hidden"
                name="productImage"
                onChange={handleFileChange}
              />

              {file && <p className="text-sm text-gray-500">{file.name}</p>}
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Product Name</label>
              <input
                name="name"
                value={newOrder.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter Product name"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Supplier ID</label>
              <input
                name="supplierId"
                value={newOrder.supplierId}
                onChange={handleChange}
                type="text"
                placeholder="Enter product supplier ID"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Cateory</label>
              <input
                name="category"
                value={newOrder.category}
                onChange={handleChange}
                type="text"
                placeholder="Enter product category"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Quantity</label>
              <input
                name="quantity"
                value={newOrder.quantity}
                onChange={handleChange}
                type="text"
                placeholder="Enter Quantity"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Unit</label>
              <input
                name="unit"
                value={newOrder.unit}
                onChange={handleChange}
                type="text"
                placeholder="Eg: pcs"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Buying Price</label>
              <input
                name="orderValue"
                value={newOrder.orderValue}
                onChange={handleChange}
                type="text"
                placeholder="Enter order value"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Date of Delivery</label>
              <input
                name="expectedDelivery"
                value={newOrder.expectedDelivery}
                onChange={handleChange}
                type="date"
                placeholder="Enter delivery date"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>

            <div className="flex justify-end items-center gap-4 mt-4">
              <button
                onClick={() => {
                  setModal(false);
                  setNewOrder(newOrderModel);
                }}
                className="px-2 p-1  bg-white border-1 border-theme text-theme hover:shadow-xl hover:cursor-pointer rounded-lg"
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                className="px-2 p-1  bg-theme text-white hover:shadow-xl hover:cursor-pointer rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;

import axios from "axios";
import React, { useEffect, useState } from "react";

const overviewModel = {
  totalCategories: 0,
  totalProducts: 0,
  totalRevenue: 0,
  totalTopSellingProducts: 0,
  topSellingRevenue: 0,
  totalLowStockProducts: 0,
};
const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [overview, setOverview] = useState(overviewModel);

  const addTwoYears = (dateString) => {
    let date = new Date(dateString);
    date.setFullYear(date.getFullYear() + 2);
    return date.toISOString().split("T")[0]; // Keeps the original format
  };

  const checkAvailability = (qtyRemaining, thresholdValue) => {
    if (qtyRemaining > thresholdValue) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/product/productPagination?page=${page}&limit=10`,
        { withCredentials: true }
      )
      .then(({ data }) => {
        axios
          .get(
            `${import.meta.env.VITE_SERVER_URL}/api/product/inventoryStats`,
            { withCredentials: true }
          )
          .then(({ data }) => {
            setOverview(data.data);
          });

        setProducts([...data.products]);
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
  return (
    <>
      <div className="py-6">
        <div className="mx-20 p-4 border-1 border-theme min-w-[440px] shadow-xl rounded-lg">
          <h1 className="text-2xl font-medium mb-4 text-[#383E49]">Overall Inventory</h1>
          <div className="flex flex-row flex-wrap min-w-[400px] justify-between">
            <div className="flex-1/4 flex p-4 border-e-1 border-gray-500/30">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-myblue">categories</p>
                <p>{overview.totalCategories}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
            </div>
            <div className="flex-1/4 flex p-4 border-e-1 border-gray-500/30">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-myorange">
                  total products
                </p>
                <p>{overview.totalProducts}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
              <div className="flex-1/2  flex gap-2 flex-col">
                <p className="capitalize font-medium text-transparent">
                  total received
                </p>
                <p>{overview.totalRevenue}</p>
                <p className="capitalize text-xs text-gray-400">Revenue</p>
              </div>
            </div>
            <div className="flex-1/4 flex p-4 border-e-1 border-gray-500/30">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-theme">top selling</p>
                <p>{overview.totalTopSellingProducts}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
              <div className="flex-1/2  flex gap-2 flex-col">
                <p className="capitalize font-medium text-transparent">
                  total received
                </p>
                <p>{overview.topSellingRevenue}</p>
                <p className="capitalize text-xs text-gray-400">Revenue</p>
              </div>
            </div>
            <div className="flex-1/4 flex p-4 ">
              <div className="flex-1/2 flex gap-2 flex-col">
                <p className="capitalize font-medium text-myred">low stocks</p>
                <p>{overview.totalLowStockProducts}</p>
                <p className="capitalize text-xs text-gray-400">total</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-20 mt-12 p-4 border-1 border-theme shadow-xl rounded-lg">
          <div className="flex justify-between">
            <p className="text-2xl font-medium mb-4 text-[#383E49]">Products</p>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <td className="p-2 font-bold">Product</td>
                <td className="p-2 font-bold">Cost</td>
                <td className="p-2 font-bold">Quantity</td>
                <td className="p-2 font-bold">threshold value</td>
                <td className="p-2 font-bold">Expiry Date</td>
                <td className="p-2 font-bold">Availability</td>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => (
                <tr
                  className={`${
                    index == products.length - 1 ? "" : "border-b-[1px]"
                  } border-theme hover:scale-101 hover:bg-theme hover:text-white`}
                  key={prod._id}
                >
                  <td className="p-2">{prod.name}</td>
                  <td className="p-2">{prod.cost}</td>
                  <td className="p-2">{prod.qtyRemaining}</td>
                  <td className="p-2">{prod.thresholdValue}</td>
                  <td className="p-2">{addTwoYears(prod.createdAt)}</td>
                  <td
                    className={`p-2 ${
                      checkAvailability(prod.qtyRemaining, prod.thresholdValue)
                        ? "text-green-500"
                        : "text-myred"
                    }`}
                  >
                    {checkAvailability(prod.qtyRemaining, prod.thresholdValue)
                      ? "In-Stock"
                      : "Out of stock"}
                  </td>
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
    </>
  );
};

export default Inventory;

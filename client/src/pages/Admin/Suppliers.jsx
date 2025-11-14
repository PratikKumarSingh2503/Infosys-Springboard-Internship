import axios from "axios";
import React, { useEffect, useState } from "react";

const supplierModel = {
  name: "",
  product: "",
  category: "",
  contact: "",
  email: "",
  type: "",
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modal, setModal] = useState(false);
  const [takingReturns, setTakingReturns] = useState();

  const [newSupplier, setNewSupplier] = useState(supplierModel);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/supplier/getSuppliers?page=${page}&limit=l0`,
        { withCredentials: true }
      )
      .then(({ data }) => {
        setSuppliers([...data.suppliers]);
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
    setNewSupplier((value1) => ({ ...value1, [name]: value }));
  };

  const handleSubmit = () => {
    newSupplier.type = takingReturns ? "taking return" : "not taking return";
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/supplier/addSupplier`,
        newSupplier
      )
      .then(({ data }) => {
        alert(data.message);
        setSuppliers((value) => [data.supplier, ...value]);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => alert(message)
      );

    setNewSupplier(supplierModel);
    setTakingReturns(null);
  };

  return (
    <>
      <div className="py-6">
        <div className="mx-20 p-4 border-1 border-theme rounded-xl shadow-xl">
          <div className="flex justify-between">
            <p className="text-2xl font-medium mb-4 text-[#383E49]">Suppliers</p>
            <button
              onClick={() => setModal(true)}
              type="button"
              className="px-4 hover:cursor-pointer hover:drop-shadow-xl  text-md  bg-theme rounded p-1 flex items-center justify-center text-white capitalize"
            >
              add supplier
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <td className="p-2 font-bold">Supplier</td>
                <td className="p-2 font-bold">Product</td>
                <td className="p-2 font-bold">Contact</td>
                <td className="p-2 font-bold">Email</td>
                <td className="p-2 font-bold">Type</td>
                <td className="p-2 font-bold">On the way</td>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supp, index) => (
                <tr
                  className={`${
                    index == suppliers.length - 1 ? "" : "border-b-[1px]"
                  } border-theme hover:scale-101 hover:bg-theme hover:text-white`}
                  key={supp._id}
                >
                  <td className="p-2">{supp.name}</td>
                  <td className="p-2">{supp.product}</td>
                  <td className="p-2">{supp.contact}</td>
                  <td className="p-2">{supp.email}</td>
                  <td
                    className={`p-2 ${
                      supp.type === "taking return"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {supp.type}
                  </td>
                  <td className="p-2">{supp.onTheWay}</td>
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
        <div className="w-full h-[680px] absolute top-11 start-0  bg-slate-400/50 backdrop-blur-[3px] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-3">
            <p className="text-xl  mt-4 mb-4 ">New Supplier</p>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Supplier Name</label>
              <input
                name="name"
                value={newSupplier.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter supplier name"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Product</label>
              <input
                name="product"
                value={newSupplier.product}
                onChange={handleChange}
                type="text"
                placeholder="Enter product name"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Cateory</label>
              <input
                name="category"
                value={newSupplier.category}
                onChange={handleChange}
                type="text"
                placeholder="Enter product category"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Contact</label>
              <input
                name="contact"
                value={newSupplier.contact}
                onChange={handleChange}
                type="text"
                placeholder="Enter contact no."
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 items-center mb-3">
              <label htmlFor="">Email</label>
              <input
                name="email"
                value={newSupplier.email}
                onChange={handleChange}
                type="text"
                placeholder="Enter email"
                className="outline-none border-1 p-1 px-2 rounded border-theme focus:shadow-xl"
              />
            </div>
            <div className="flex flex-row justify-between gap-3 mb-3">
              <label htmlFor="" className="flex-1/3">
                Type
              </label>
              <div className="flex flex-col gap-3 items-start flex-2/3">
                <button
                  onClick={() => setTakingReturns(true)}
                  className={`outline-none text-gray-400 hover:cursor-pointer border-1 p-1 px-2 ms-1 rounded border-theme focus:shadow-xl ${
                    takingReturns == true ? "bg-theme text-white" : ""
                  }`}
                >
                  Taking returns
                </button>
                <button
                  onClick={() => setTakingReturns(false)}
                  className={`outline-none text-gray-400 hover:cursor-pointer border-1 p-1 px-2 ms-1 rounded border-theme focus:shadow-xl ${
                    takingReturns == false ? "bg-theme text-white" : ""
                  }`}
                >
                  Not taking returns
                </button>
              </div>
            </div>
            <div className="flex justify-end items-center gap-4 mt-4">
              <button
                onClick={() => {
                  setModal(false);
                  setNewSupplier(supplierModel);
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

export default Suppliers;

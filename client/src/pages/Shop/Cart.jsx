import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../appwrite.config";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productIds = JSON.parse(localStorage.getItem("cartItems"));
    if (productIds) fetchCartProducts(productIds);
  }, []);

  const fetchCartProducts = async (productIds) => {
    if (!Array.isArray(productIds) || productIds.length === 0) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/product/getProductsByIdsList`,
        { productIds },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      setProducts(
        data.map((product) => {
          let imageUrl = null;
          if (product.productImage) {
            try {
              imageUrl = storage
                .getFilePreview(
                  import.meta.env.VITE_APPWRITE_BUCKET_ID,
                  product.productImage
                )
                .toString();
            } catch (error) {
              console.error('Error loading product image:', error);
            }
          }
          return {
            ...product,
            quantity: 1,
            imageUrl,
          };
        })
      );
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const updateQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeProduct = (id) => {
    const updatedCart = products.filter((item) => item._id !== id);
    setProducts(updatedCart);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart.map((item) => item._id))
    );
  };

  const getTotal = () =>
    products.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );
  const getShippingFee = () => (getTotal() < 500 ? 50 : 0);

  const buyProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to log in before purchasing.");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/sales/recordSales`,
        {
          sales: products.map(({ _id, quantity, name, category }) => ({
            _id,
            quantity,
            name,
            category,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      localStorage.removeItem("cartItems");
      setProducts([]);
      alert(data.message);
      setProducts([]);
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed.");
    }
  };

  const proceedToCheckout = () => {
    if (products.length === 0) return alert("Your cart is empty!");
    navigate("/checkout", { state: { cartItems: products } });
  };

  return (
    <section className="py-6">
      {products.length === 0 ? (
        <p className="text-center py-10 text-2xl text-[#383E49]">Your cart is empty.</p>
      ) : (
        <>
          <div className="mx-20 pb-5 border-b border-theme overflow-auto">
            <table className="border-separate border-spacing-y-5 w-full border-collapse">
              <thead>
                <tr className="shadow">
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Subtotal</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="shadow">
                    <td className="p-2 flex flex-col gap-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      {product.name}
                    </td>
                    <td className="p-2">₹{product.sellingPrice}</td>
                    <td className="p-2">
                      <div className="w-12 p-1 gap-3 border flex rounded-sm">
                        {product.quantity}
                        <div className="flex flex-col">
                          <button
                            onClick={() => updateQuantity(product._id, 1)}
                            className="cursor-pointer"
                          >
                            <MdOutlineKeyboardArrowUp />
                          </button>
                          <button
                            onClick={() => updateQuantity(product._id, -1)}
                            className="cursor-pointer"
                          >
                            <MdOutlineKeyboardArrowDown />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      ₹{(product.sellingPrice * product.quantity).toFixed(2)}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="px-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w- mt-12 mx-20 p-4 gap-2 border flex flex-col">
            <p>Cart Total</p>
            <div className="pb-2 flex justify-between border-b border-gray-300">
              <p>Subtotal: </p>
              <p>₹{getTotal()}</p>
            </div>
            <div className="pb-2 flex justify-between border-b border-gray-300">
              <p>Shipping Fee: </p>
              <p>₹{getShippingFee()}</p>
            </div>
            <div className="flex justify-between">
              <p>Total: </p>
              <p>₹{getTotal() + getShippingFee()}</p>
            </div>
            <button
              onClick={proceedToCheckout}
              className={`mt-2 mx-auto px-10 py-2 text-white ${
                products.length > 0
                  ? "bg-theme"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={products.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;

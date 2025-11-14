import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
  });

  const getTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );

  const getShippingFee = () => (getTotal() < 500 ? 50 : 0);

  const handleChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (
      !billingDetails.firstName ||
      !billingDetails.address ||
      !billingDetails.phone ||
      !billingDetails.email
    ) {
      alert("Please fill in all billing details.");
      return;
    }

    console.log("Order Placed:", { cartItems, billingDetails });
    alert("Order placed successfully!");
    localStorage.removeItem("cartItems");
    navigate("/shop", { replace: true });
  };

  return (
    <div className="py-6">
      <h2 className=" mx-20 text-2xl font-medium mb-4 text-[#383E49]">Billing Details</h2>
      {/* Left - Billing Details */}
      <div className="mx-20 mt-6 md:flex gap-20">
        <div className="flex-5 flex flex-col gap-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="pl-2 py-2 rounded-sm bg-gray-100"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="pl-2 py-2 rounded-sm bg-gray-100"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="pl-2 py-2 rounded-sm bg-gray-100"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="pl-2 py-2 rounded-sm bg-gray-100"
          />
        </div>

        {/* Right - Order Summary */}
        <div className="flex-5 gap-5">
          {cartItems.length === 0 ? (
            <p>No products in checkout.</p>
          ) : (
            cartItems.map((product) => (
              <div key={product._id} className="flex mb-6 justify-between">
                <div className="flex gap-5">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <p className="font-semibold">{product.name}</p>
                </div>

                <p>₹{(product.sellingPrice * product.quantity).toFixed(2)}</p>
              </div>
            ))
          )}

          {/* Shipping & Total */}
          <div className="flex border-b justify-between font-semibold pt-3">
            <p>Subtotal:</p>
            <p>₹{getTotal()}</p>
          </div>
          <div className="flex border-t justify-between font-semibold pt-3">
            <p>Shipping Fee:</p>
            <p>₹{getShippingFee()}</p>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3">
            <p>Total:</p>
            <p>₹{getTotal() + getShippingFee()}</p>
          </div>

          <button
            onClick={placeOrder}
            className="mt-4 py-2 px-10 bg-theme text-white rounded-md "
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

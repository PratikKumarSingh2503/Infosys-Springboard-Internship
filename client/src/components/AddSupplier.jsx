import React, { useState } from "react";
import axios from "axios";

const AddSupplierModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    product: "",
    category: "",
    contact: "",
    email: "",
    type: "Regular",
    supplierImage: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/supplier/addSupplier`,
        formData,
        { headers: { "Content-Type": "application/json" } } // Ensure JSON format
      );

      if (response.status === 201) {
        setSuccess("Supplier added successfully!");
        setTimeout(onClose, 1500);
      }
    } catch (err) {
      setError("Failed to add supplier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center " style={{backgroundColor: rgba(255, 0, 0, 0.4)}}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Supplier</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            name="product"
            placeholder="Product"
            value={formData.product}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          >
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
          </select>

          <input
            type="text"
            name="supplierImage"
            placeholder="Image URL (Optional)"
            value={formData.supplierImage}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded mt-2"
          >
            {loading ? "Adding..." : "Add Supplier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;

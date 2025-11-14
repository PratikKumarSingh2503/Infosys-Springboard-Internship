import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { storage } from "../appwrite.config";

const ProductOverview = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/product/getProduct/${id}`,
          { withCredentials: true }
        );

        console.log("Fetched product:", data);
        if (!data) throw new Error("No product data received");

        setProduct(data);

        if (data.productImage) {
          try {
            const result = storage.getFilePreview(
              import.meta.env.VITE_APPWRITE_BUCKET_ID,
              data.productImage
            );
            setImage(result.toString());
          } catch (error) {
            console.error('Error loading product image:', error);
            setImage(null);
          }
        } else {
          setImage(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addTocart = () => {
    if (!product) return;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (!cartItems.includes(product._id)) {
      cartItems.push(product._id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert(`${product.name} has been added to the cart`);
    } else {
      alert(`${product.name} is already in the cart`);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex gap-10 mx-20 my-10">
      <div className="w-1/2 flex justify-center items-center">
        <img src={image} alt={product.name} className="h-96" />
      </div>

      <div className="w-1/2">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-green-500 font-semibold text-2xl my-2">
          ₹{product.sellingPrice}
        </p>
        <p className="text-gray-600">{product.description}</p>

        <div className="flex gap-4 mt-5">
          <button
            className="bg-theme text-white px-5 py-2 rounded"
            onClick={addTocart}
          >
            Add to Cart
          </button>
        </div>

        <div className="mt-20 p-3 mr-50 border rounded">
          <p className="font-bold">Offers:</p>
          <ul className="list-disc ml-5">
            <li>10% Cashback on UPI</li>
            <li>EMI Options Available</li>
            <li>Free Delivery for Prime Members</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;

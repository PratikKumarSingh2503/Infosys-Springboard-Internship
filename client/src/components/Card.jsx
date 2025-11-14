import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../appwrite.config";

export const Card = ({ product }) => {
  const { _id, productImage, name, sellingPrice } = product;
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (productImage) {
      try {
        const result = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          productImage
        );
        setImage(result.toString());
      } catch (error) {
        console.error('Error loading product image:', error);
        setImage(null);
      }
    } else {
      setImage(null);
    }
  }, [productImage]);

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      className="rounded w-60 h-70 mt-4 flex flex-col cursor-pointer hover:shadow-sm"
      onClick={handleClick}
    >
      <img
        src={image || "/vite.svg"}
        className="object-contain h-48 mb-2 bg-gray-100 p-5"
        alt={name}
        onError={(e) => {
          e.target.src = "/vite.svg";
        }}
      />
      <div className="flex flex-col flex-grow gap-1 px-5">
        <p className="font-semibold capitalize truncate">{name}</p>
        <p className="text-green-500 font-semibold">₹{sellingPrice}</p>
      </div>
    </div>
  );
};
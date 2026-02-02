import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../appwrite.config";

export const Card = ({ product }) => {
  const { _id, productImage, name, sellingPrice } = product;
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productImage) return;
    try {
      const result = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        productImage
      );
      setImage(result.toString());
    } catch {
      setImage(null);
    }
  }, [productImage]);

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  const imagePlaceholder = (
    <div className="object-contain h-48 mb-2 bg-gray-200 p-5 flex items-center justify-center text-gray-500 text-sm">
      No image
    </div>
  );

  return (
    <div
      className="rounded w-60 h-70 mt-4 flex flex-col cursor-pointer hover:shadow-sm"
      onClick={handleClick}
    >
      {image ? (
        <img
          src={image}
          className="object-contain h-48 mb-2 bg-gray-100 p-5"
          alt={name}
          onError={() => setImage(null)}
        />
      ) : (
        imagePlaceholder
      )}
      <div className="flex flex-col flex-grow gap-1 px-5">
        <p className="font-semibold capitalize truncate">{name}</p>
        <p className="text-green-500 font-semibold">₹{sellingPrice}</p>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "./Card";

const CategoryOverview = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/product/getProductsByCateogory?category=${category}`,
          { withCredentials: true }
        );
        setProducts(data);
      } catch (error) {
        alert("Failed to fetch products");
      }
    };

    fetchCategoryProducts();
  }, [category]); // Fetch again when category changes

  return (
    <div className="mx-20">
      <h2 className="text-3xl font-semibold my-6">{category.toUpperCase()}</h2>
      <section className="grid grid-cols-5 gap-6">
        {products.length > 0 ? (
          products.map((item) => <Card key={item._id} product={item} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </section>
    </div>
  );
};

export default CategoryOverview;

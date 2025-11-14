import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import axios from "axios";
import Slider from "react-slick";
import hero_1 from "../../assets/hero_1.jpg";
import hero_2 from "../../assets/hero_2.webp";
import hero_3 from "../../assets/hero_3.webp";
import hero_4 from "../../assets/hero_4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaMobileAlt,
  FaLaptop,
  FaCamera,
  FaHeadphones,
  FaGamepad,
} from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchTopSellingProducts();
  }, []);

  const fetchProducts = async (loadAll = false) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/product/productPagination?page=1&limit=${loadAll ? 1000 : 10}`,
        { withCredentials: true }
      );
      setProducts(data.products);
      if (loadAll) setAllProductsLoaded(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch products");
    }
  };

  const fetchTopSellingProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product/getTopSellingProducts`,
        { withCredentials: true }
      );
      setTopSellingProducts(data);
    } catch (error) {
      alert("Failed to fetch top-selling products");
    }
  };

  const slidingProducts = [
    { id: 1, image: hero_1, name: "Product 1" },
    { id: 2, image: hero_2, name: "Product 2" },
    { id: 3, image: hero_3, name: "Product 3" },
    { id: 4, image: hero_4, name: "Product 4" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  const categories = [
    {
      name: "Phones",
      icon: <FaMobileAlt className="w-12 h-12" />,
      path: "/shop/phones",
    },
    {
      name: "Computers",
      icon: <FaLaptop className="w-12 h-12" />,
      path: "/shop/computers",
    },
    {
      name: "SmartWatch",
      icon: <BsSmartwatch className="w-12 h-12" />,
      path: "/shop/smartwatch",
    },
    {
      name: "Camera",
      icon: <FaCamera className="w-12 h-12" />,
      path: "/shop/camera",
    },
    {
      name: "HeadPhones",
      icon: <FaHeadphones className="w-12 h-12" />,
      path: "/shop/headphones",
    },
    {
      name: "Gaming",
      icon: <FaGamepad className="w-12 h-12" />,
      path: "/shop/gaming",
    },
  ];

  return (
    <div className="mx-20">
      {/* 1️⃣ Hero Slider */}
      <div className="mb-8">
        <Slider {...sliderSettings}>
          {slidingProducts.map((product) => (
            <div key={product.id} className="relative w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-cover rounded-md shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 2️⃣ Category Grid */}
      <div className="my-20 pb-5 border-b border-purple-500">
        <div className="flex mb-4 items-center text-[#817AF3]">
          <h2 className="font-bold ml-2">Categories</h2>
        </div>
        <h2 className="text-3xl font-semibold mb-8">Browse By Category</h2>
        <section className="mt-15 mb-5 px-10 grid grid-cols-6 gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="p-5 border rounded-md hover:shadow-lg flex flex-col items-center"
            >
              <div className="flex items-center justify-center">{cat.icon}</div>
              <p className="text-center font-bold mt-5">{cat.name}</p>
            </Link>
          ))}
        </section>
      </div>

      {/* 3️⃣ Best Selling Products */}
      <div className="my-15 pb-5 border-b border-purple-500">
        <div className="flex mb-4 items-center text-[#817AF3]">
          <h2 className="font-bold ml-2">This Month</h2>
        </div>
        <h2 className="text-3xl font-semibold mb-4">Best Selling Products</h2>
        <section className="px-10 flex flex-wrap gap-4">
          {topSellingProducts.map((item) => (
            <Card key={item._id} product={item} />
          ))}
        </section>
      </div>

      <div className="my-12 pb-5 border-b border-theme">
        <div className="flex mb-4 items-center text-[#817AF3]">
          <h2 className="font-bold ml-2">Our Products</h2>
        </div>
        <h2 className="text-3xl font-semibold mb-4">Explore Our Products</h2>
        <section className="px-10 flex flex-wrap gap-4">
          {products.map((item) => (
            <Card key={item._id} product={item} />
          ))}
        </section>
        <div className="mt-6 flex justify-center">
          {!allProductsLoaded && (
            <button
              onClick={() => fetchProducts(true)}
              className="px-4 py-2 bg-theme text-white rounded hover:shadow-lg"
            >
              Explore More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;

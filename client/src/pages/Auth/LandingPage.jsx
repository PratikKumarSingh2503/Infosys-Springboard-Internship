import React from "react";
import Lottie from "lottie-react";
import homebg from "../../assets/homebg.json";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col p-6 md:px-20 overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center z-100">
        <h1
          className="text-[20px] md:text-[64px] font-extrabold"
          style={{ fontFamily: "'Merriweather Sans'" }}
        >
          <span className="text-custom-purple">Stock</span>
          <span className="text-custom-blue">Sync</span>
        </h1>
        <div className="space-x-4 md:space-x-[34px] text-[12px] md:text-[20px] italic font-bold">
          <Link
            to="/login"
            className="px-6 md:px-10 py-1 md:py-2 border text-custom-blue hover:bg-custom-blue rounded-full"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 md:px-10 py-1 md:py-2 bg-custom-purple text-white rounded-full shadow-md hover:bg-custom-purple"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center flex-grow lg:mt-[-200px]">
        <div className="lg:w-2/3 flex justify-center top-0">
          <Lottie
            animationData={homebg}
            loop={true}
            className="max-w-[80%] md:max-w-[100%]"
          />
        </div>

        {/* Left Content (Text) */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <h2
            className="text-[26px] md:text-[32px] font-extrabold mb-4"
            style={{ fontFamily: "'Merienda'" }}
          >
            Seamless Inventory, Smarter Business
          </h2>
          <p
            className="text-[16px] md:text-[20px] font-regular leading-normal mb-6"
            style={{ fontFamily: "'Merienda One'" }}
          >
            Track, manage, and optimize your <br />
            inventory with ease— all in one powerful <br />
            platform.
          </p>
          <button
            className="px-6 md:px-10 py-1 md:py-2 rounded-full text-[12px] md:text-[20px] text-white font-bold bg-custom-purple hover:bg-custom-purple"
            style={{ fontFamily: "'Merriweather'" }}
          >
            <Link to="/register" className="">
              Get Started
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

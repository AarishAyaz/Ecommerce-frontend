import React, { useState, useEffect } from "react";
import Electronics from '../assets/Electronics.jpeg'
import Fashion from '../assets/Fashion.jpeg'
import Furniture from '../assets/Furniture.jpeg'

const HeroSection = () => {
  const slides = [Electronics, Fashion, Furniture];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  });

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Images */}
      {slides.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="Slide"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-2xl mt-4 drop-shadow-lg">
          Discover the best deals on all categories
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-full shadow-md transition">
          Shop Now
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

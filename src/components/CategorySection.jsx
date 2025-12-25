import Electronics from '../assets/Electronics.jpeg'
import Fashion from '../assets/Fashion.jpeg'
import Furniture from '../assets/Furniture.jpeg'
import HomeAppliance from '../assets/HomeAppliance.jpg'
import CategoryCard from "./CategoryCard";
import { ArrowRight, Zap } from "lucide-react";


// Categories Section Component
const CategoriesSection = () => {
  // Placeholder images - replace with your actual images
  const categories = [
    { 
      title: "Electronics", 
      image: Electronics
    },
    { 
      title: "Fashion", 
      image: Fashion
    },
    { 
      title: "Furniture", 
      image: Furniture
    },
    { 
      title: "Home Appliances", 
      image: HomeAppliance
    },
  ];

  const handleCategoryClick = (title) => {
    console.log(`Navigate to ${title} category`);
    // In your app: navigate to category or filter products
  };

  return (
    <section id="categories" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 backdrop-blur-md 
                      border border-indigo-400/30 rounded-full mb-4 sm:mb-6">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Shop by Category
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                     font-bold text-white mb-3 sm:mb-4 md:mb-6
                     bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
          Explore Categories
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                    text-gray-400 max-w-3xl mx-auto">
          Discover our curated collection across premium categories
        </p>

        {/* Decorative Line */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
          <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-indigo-500"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-indigo-500"></div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <CategoryCard
              key={idx}
              image={cat.image}
              title={cat.title}
              onClick={() => handleCategoryClick(cat.title)}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 sm:mt-12 md:mt-16">
        <button
          onClick={() => {
            const element = document.getElementById("products");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
          className="group inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-700 hover:to-purple-700
                   text-white text-sm sm:text-base md:text-lg font-bold rounded-full
                   shadow-xl shadow-indigo-900/50 hover:shadow-2xl hover:shadow-indigo-900/70
                   transition-all duration-300 transform hover:scale-105"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
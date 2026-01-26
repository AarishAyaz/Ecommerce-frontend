import { useEffect, useState } from "react";
import axios from "../axios";
import CategoryCard from "./CategoryCard";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-400">
        Loading categories...
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-20 text-center text-gray-400">
        No categories found.
      </section>
    );
  }

  return (
    <section
      id="categories"
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 backdrop-blur-md 
                        border border-indigo-400/30 rounded-full mb-6">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-300 text-sm font-semibold uppercase tracking-wider">
            Shop by Category
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Explore Categories
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto">
          Discover our curated collection across premium categories
        </p>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              image={`http://localhost:5000${cat.image}`}
              title={cat.name}
              onClick={() => handleCategoryClick(cat._id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-16">
        <button
          onClick={() => {
            const element = document.getElementById("products");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
          className="group inline-flex items-center gap-2 px-10 py-4
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-700 hover:to-purple-700
                   text-white font-bold rounded-full
                   shadow-xl transition-all duration-300"
        >
          <span>View All Products</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;

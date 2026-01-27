import { useEffect, useState } from "react";
import axios from "../axios";
import CategoryCard from "./CategoryCard";
import { ArrowRight, Zap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Add this style tag to your global CSS or index.css:
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
        setError("Unable to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Trigger re-fetch
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
        setError("Unable to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  };

  // Loading State with Skeleton
  if (loading) {
    return (
      <section
        id="categories"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-400/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-semibold uppercase tracking-wide">
              Shop by Category
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore Categories
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Discover our curated collection across premium categories
          </p>
        </div>

        {/* Skeleton Loader */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-none w-72 h-72 bg-slate-800/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="h-6 bg-slate-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section
        id="categories"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              Oops! Something went wrong
            </h3>
            
            <p className="text-gray-400 mb-8">
              {error}
            </p>
            
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-8 py-3
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500
                       text-white font-semibold rounded-full 
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105
                       transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (categories.length === 0) {
    return (
      <section
        id="categories"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
              <Zap className="w-8 h-8 text-indigo-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              No Categories Available
            </h3>
            
            <p className="text-gray-400">
              We're currently updating our catalog. Please check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Success State
  return (
    <section
      id="categories"
      className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-400/30 rounded-full mb-6 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-300 text-sm font-semibold uppercase tracking-wide">
            Shop by Category
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Explore Categories
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Discover our curated collection across premium categories
        </p>
      </div>

      {/* Horizontal Scrollable Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {categories.slice(0, 6).map((cat) => (
            <div key={cat._id} className="flex-none w-72 snap-start">
              <CategoryCard
                image={`${BASE_URL}${cat.image}`}
                title={cat.name}
                onClick={() => handleCategoryClick(cat._id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-16">
        <button
          onClick={() => navigate("/categories")}
          className="group inline-flex items-center gap-2 px-10 py-4
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-500 hover:to-purple-500
                   text-white font-bold rounded-full 
                   shadow-lg hover:shadow-xl
                   transform hover:scale-105
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="View all categories"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
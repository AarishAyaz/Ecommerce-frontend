import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
      return () => scrollElement.removeEventListener("scroll", checkScroll);
    }
  }, [products]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    axios.get("/api/products")
      .then(({ data }) => setProducts(data))
      .catch(err => {
        console.error("Failed to load products", err);
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  // Loading State
  if (loading) {
    return (
      <section
        id="products"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 
                          border border-purple-400/30 rounded-full mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
              Trending Now
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Featured Products
          </h2>

          <p className="text-gray-400 text-lg">
            Discover our handpicked collection
          </p>
        </div>

        {/* Skeleton Loader */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-hidden pb-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-none w-80 bg-slate-800/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-slate-700/50" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-slate-700/50 rounded w-3/4" />
                  <div className="h-5 bg-slate-700/50 rounded w-1/2" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-10 bg-slate-700/50 rounded flex-1" />
                    <div className="h-10 w-10 bg-slate-700/50 rounded" />
                  </div>
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
        id="products"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
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
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Filter for in-stock products
  const featured = products.filter(p => p.countInStock > 0).slice(0, 12);

  // Empty State
  if (featured.length === 0) {
    return (
      <section
        id="products"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <TrendingUp className="w-10 h-10 text-purple-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              No Products Available
            </h3>
            
            <p className="text-gray-400">
              We're currently updating our catalog. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 
                          border border-purple-400/30 rounded-full mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold uppercase tracking-wide">
              Trending Now
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Featured Products
          </h2>

          <p className="text-gray-400 text-lg">
            Discover our handpicked collection
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={scrollLeft}
            disabled={!showLeftArrow}
            className={`group w-12 h-12 rounded-full 
                     bg-slate-800/50 border border-slate-700/50
                     backdrop-blur-sm
                     flex items-center justify-center
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     ${showLeftArrow 
                       ? 'hover:bg-slate-700/50 hover:border-slate-600 hover:scale-110 cursor-pointer' 
                       : 'opacity-40 cursor-not-allowed'}`}
            aria-label="Scroll left"
          >
            <ChevronLeft className={`w-6 h-6 transition-colors ${showLeftArrow ? 'text-white group-hover:text-purple-400' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!showRightArrow}
            className={`group w-12 h-12 rounded-full 
                     bg-slate-800/50 border border-slate-700/50
                     backdrop-blur-sm
                     flex items-center justify-center
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     ${showRightArrow 
                       ? 'hover:bg-slate-700/50 hover:border-slate-600 hover:scale-110 cursor-pointer' 
                       : 'opacity-40 cursor-not-allowed'}`}
            aria-label="Scroll right"
          >
            <ChevronRight className={`w-6 h-6 transition-colors ${showRightArrow ? 'text-white group-hover:text-purple-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-6 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {featured.map((product) => (
            <div key={product._id} className="flex-none w-80 snap-start">
              <ProductCard
                id={product._id}
                image={`${BASE_URL}${product.image}`}
                title={product.name}
                price={product.price}
                rating={product.rating || 5}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            </div>
          ))}
        </div>

        {/* Mobile Navigation Indicators */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          <div className={`h-1 rounded-full transition-all ${showLeftArrow ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700'}`} />
          <div className={`h-1 rounded-full transition-all ${!showLeftArrow && !showRightArrow ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700'}`} />
          <div className={`h-1 rounded-full transition-all ${showRightArrow ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700'}`} />
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/products")}
          className="group inline-flex items-center gap-2 px-10 py-4
                   bg-gradient-to-r from-purple-600 to-indigo-600 
                   hover:from-purple-500 hover:to-indigo-500
                   text-white font-bold rounded-full
                   shadow-lg hover:shadow-xl
                   transform hover:scale-105
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span>View All Products</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </section>
  );
};

export default ProductsSection;
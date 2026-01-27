import { useEffect, useState } from "react";
import axios from "../axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  ChevronRight, 
  Package, 
  AlertCircle, 
  SlidersHorizontal,
  ArrowUpDown,
  Search
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
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

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !filterInStock || product.countInStock > 0;
    return matchesSearch && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="h-6 w-48 bg-slate-800/50 rounded animate-pulse mb-8" />
        </div>

        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="h-12 w-64 bg-slate-800/50 rounded animate-pulse mb-4" />
          <div className="h-6 w-96 bg-slate-800/50 rounded animate-pulse mb-8" />
          
          {/* Search & Filter Skeleton */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="h-12 w-80 bg-slate-800/50 rounded-xl animate-pulse" />
            <div className="h-12 w-48 bg-slate-800/50 rounded-xl animate-pulse" />
            <div className="h-12 w-32 bg-slate-800/50 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-slate-700/50" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-slate-700/50 rounded w-3/4" />
                  <div className="h-5 bg-slate-700/50 rounded w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-10 bg-slate-700/50 rounded flex-1" />
                    <div className="h-10 w-10 bg-slate-700/50 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg">
              {error}
            </p>
            
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-8 py-4
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
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">Products</span>
          </nav>
        </div>

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/20 border border-indigo-400/30 rounded-xl">
              <Package className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              All Products
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg mb-8">
            Browse our complete collection of {products.length} products
          </p>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 
                           bg-slate-800/50 border border-slate-700/50
                           text-white placeholder-gray-400
                           rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition-all duration-200"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-12 pr-10 py-3 w-full lg:w-64
                         bg-slate-800/50 border border-slate-700/50
                         text-white text-sm font-medium
                         rounded-xl cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200
                         hover:border-slate-600"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3
                       bg-slate-800/50 border border-slate-700/50
                       text-white text-sm font-medium
                       rounded-xl
                       hover:border-slate-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition-all duration-200
                       ${showFilters ? 'bg-indigo-600/20 border-indigo-500/50' : ''}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {filterInStock && (
                <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">1</span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mb-8 p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
              <h3 className="text-white font-semibold mb-4">Filters</h3>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filterInStock}
                    onChange={(e) => setFilterInStock(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-700/50 
                             text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-slate-900
                             transition-all cursor-pointer"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    In Stock Only
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{sortedProducts.length}</span> of{" "}
              <span className="text-white font-semibold">{products.length}</span> products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="pb-16">
          {sortedProducts.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 border border-slate-700/50 rounded-full mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No products found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterInStock(false);
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-50 lg:gap-y-10">
              {sortedProducts.map((product) => (
                <div key={product._id} className="flex">
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
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
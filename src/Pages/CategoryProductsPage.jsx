import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { 
  Home, 
  ChevronRight, 
  Grid3x3, 
  AlertCircle, 
  SlidersHorizontal,
  ArrowUpDown,
  Package
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products
        const productsRes = await fetch(`${BASE_URL}/api/products/category/${id}`);
        if (!productsRes.ok) throw new Error("Failed to fetch products");
        const productsData = await productsRes.json();
        setProducts(productsData);

        // Fetch category name
        try {
          const categoryRes = await fetch(`${BASE_URL}/api/categories/${id}`);
          if (categoryRes.ok) {
            const categoryData = await categoryRes.json();
            setCategoryName(categoryData.name || "Category");
          }
        } catch {
          setCategoryName("Category");
        }

      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetch(`${BASE_URL}/api/products/category/${id}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="h-6 w-64 bg-slate-800/50 rounded animate-pulse mb-8" />
        </div>

        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="h-12 w-80 bg-slate-800/50 rounded animate-pulse mb-4" />
          <div className="h-6 w-48 bg-slate-800/50 rounded animate-pulse mb-8" />
          <div className="h-12 w-48 bg-slate-800/50 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
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
                  <div className="h-10 bg-slate-700/50 rounded" />
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
        <div className="max-w-7xl mx-auto px-6 py-16">
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
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm mb-8 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <button
            onClick={() => navigate("/categories")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Categories
          </button>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white font-medium">{categoryName}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/20 border border-indigo-400/30 rounded-xl">
            <Grid3x3 className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {categoryName}
          </h1>
        </div>
        
        <p className="text-gray-400 text-lg mb-6">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>

        {/* Filters & Sort Bar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-12 pr-10 py-3 
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
            </select>
            <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
          </div>

          {/* Filter Button (placeholder for future filters) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-6 py-3
                     bg-slate-800/50 border border-slate-700/50
                     text-white text-sm font-medium
                     rounded-xl
                     hover:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     transition-all duration-200"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {sortedProducts.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 border border-slate-700/50 rounded-full mb-6">
              <Package className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No products found
            </h3>
            <p className="text-gray-400 mb-8">
              This category doesn't have any products yet.
            </p>
            <button
              onClick={() => navigate("/categories")}
              className="inline-flex items-center gap-2 px-8 py-3
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500
                       text-white font-semibold rounded-full 
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <Grid3x3 className="w-5 h-5" />
              <span>Browse All Categories</span>
            </button>
          </div>
        ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-50 lg:gap-y-10">
            {sortedProducts.map(product => (
              <div key={product._id} className="">
                <ProductCard
                  id={product._id}
                  image={`${BASE_URL}${product.image}`}
                  title={product.name}
                  price={product.price}
                  rating={product.rating || 5}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
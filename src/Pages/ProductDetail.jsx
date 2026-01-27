import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { 
  Home, 
  ChevronRight, 
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Package,
  Truck,
  Shield,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setSelectedImage(`${BASE_URL}${data.image}`);
      } catch (err) {
        console.error("Failed to load product details", err);
        setError("Unable to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Add ${quantity} x ${product.name} to cart`);
    // Add your cart logic here
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.countInStock) {
      setQuantity(newQuantity);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    axios.get(`/api/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setSelectedImage(`${BASE_URL}${data.image}`);
      })
      .catch(err => {
        console.error("Failed to load product details", err);
        setError("Unable to load product details. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="h-6 w-96 bg-slate-800/50 rounded animate-pulse mb-8" />
        </div>

        {/* Product Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-slate-800/50 rounded-2xl animate-pulse" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-20 h-20 bg-slate-800/50 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="space-y-6">
              <div className="h-12 bg-slate-800/50 rounded animate-pulse w-3/4" />
              <div className="h-8 bg-slate-800/50 rounded animate-pulse w-1/4" />
              <div className="h-6 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-6 bg-slate-800/50 rounded animate-pulse w-5/6" />
              <div className="h-6 bg-slate-800/50 rounded animate-pulse w-4/6" />
              <div className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />
              <div className="h-14 bg-slate-800/50 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              {error ? "Oops! Something went wrong" : "Product Not Found"}
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg">
              {error || "The product you're looking for doesn't exist or has been removed."}
            </p>
            
            <div className="flex gap-4 justify-center">
              {error && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-8 py-4
                           bg-gradient-to-r from-indigo-600 to-purple-600 
                           hover:from-indigo-500 hover:to-purple-500
                           text-white font-semibold rounded-full 
                           shadow-lg hover:shadow-xl
                           transform hover:scale-105
                           transition-all duration-200"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 px-8 py-4
                         bg-slate-800/50 border border-slate-700/50
                         hover:bg-slate-700/50
                         text-white font-semibold rounded-full 
                         transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rating = product.rating || 5;
  const isInStock = product.countInStock > 0;

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
            <button
              onClick={() => navigate("/products")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Products
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Content */}
        <div className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Image Badge */}
                {!isInStock && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full">
                    <span className="text-white font-semibold text-sm">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery (if you have multiple images) */}
              {/* Placeholder for future implementation */}
              <div className="flex gap-4">
                <button className="w-20 h-20 rounded-lg border-2 border-indigo-500 overflow-hidden">
                  <img src={selectedImage} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {rating.toFixed(1)} rating
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="py-6 border-y border-slate-700/50">
                <p className="text-gray-300 leading-relaxed">
                  {product.description || "No description available for this product."}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <Package className={`w-5 h-5 ${isInStock ? "text-green-400" : "text-red-400"}`} />
                <span className={`font-semibold ${isInStock ? "text-green-400" : "text-red-400"}`}>
                  {isInStock ? `In Stock (${product.countInStock} available)` : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              {isInStock && (
                <div className="space-y-3">
                  <label className="text-gray-400 text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-slate-700/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-5 h-5 text-white" />
                      </button>
                      <span className="px-8 py-3 text-white font-semibold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.countInStock}
                        className="p-3 hover:bg-slate-700/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <span className="text-gray-400 text-sm">
                      Max: {product.countInStock}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4
                           bg-gradient-to-r from-purple-600 to-indigo-600
                           hover:from-purple-500 hover:to-indigo-500
                           text-white font-bold rounded-xl
                           shadow-lg hover:shadow-xl
                           transform hover:scale-105
                           transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-4 rounded-xl border transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900
                           ${isFavorite
                             ? "bg-red-500/20 border-red-500/50 text-red-400"
                             : "bg-slate-800/50 border-slate-700/50 text-gray-400 hover:text-red-400 hover:border-red-500/50"
                           }`}
                  aria-label="Add to favorites"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                </button>

                <button
                  onClick={() => console.log("Share product")}
                  className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl
                           text-gray-400 hover:text-white hover:border-slate-600
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label="Share product"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <Truck className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Free Delivery</h4>
                    <p className="text-gray-400 text-sm">On orders over $50</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <Shield className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Secure Payment</h4>
                    <p className="text-gray-400 text-sm">100% secure transactions</p>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mt-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Products</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
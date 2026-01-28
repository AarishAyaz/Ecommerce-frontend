import { useContext, useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductCard = ({ id, image, title, price, rating = 5}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const Navigate = useNavigate();
  const handleNavigate = () => {
    console.log(`Navigate to product ${id}`);
    Navigate(`/product/${id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    console.log(`Quick view product ${id}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <div
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex-shrink-0
               bg-gradient-to-br from-slate-800 to-slate-900
               rounded-xl sm:rounded-2xl 
               border border-slate-700 hover:border-indigo-500/50
               shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-indigo-900/30
               transition-all duration-500 transform hover:scale-[1.02]
               w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] xl:w-[340px]
               overflow-hidden flex flex-col"
    >
      {/* Image Container */}
      <div
        className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[280px] 
                    bg-slate-900 overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80";
          }}
          className="w-full h-full object-cover transition-transform duration-700 
                   group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Hot Deal Badge */}
        <div className="absolute top-3 left-3">
          <div
            className="bg-gradient-to-r from-red-600 to-orange-600 
                        px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full"
          >
            <span className="text-xs sm:text-sm font-bold text-white">Hot</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
        >
          <button
            onClick={handleToggleFavorite}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                     bg-slate-800/90 backdrop-blur-sm border border-slate-600
                     flex items-center justify-center 
                     hover:bg-red-500 hover:border-red-500
                     transition-all duration-300 group/heart"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${
                isFavorite
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-300 group-hover/heart:text-white"
              }`}
            />
          </button>

          <button
            onClick={handleQuickView}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full 
                     bg-slate-800/90 backdrop-blur-sm border border-slate-600
                     flex items-center justify-center 
                     hover:bg-indigo-500 hover:border-indigo-500
                     transition-all duration-300 group/eye"
          >
            <Eye
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 
                         group-hover/eye:text-white transition-colors"
            />
          </button>
        </div>

        {/* Rating Badge */}
        <div
          className={`absolute bottom-3 left-3 flex items-center gap-1.5
                    bg-slate-900/90 backdrop-blur-md 
                    px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full
                    border border-slate-700
                    transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }`}
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs sm:text-sm font-bold text-white">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3.5 sm:p-4 md:p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className="text-sm sm:text-base md:text-lg font-bold text-white 
                     leading-snug line-clamp-2 h-[40px] sm:h-[44px] md:h-[48px]
                     group-hover:text-indigo-300 transition-colors duration-300"
        >
          {title}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mt-2.5 sm:mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-slate-600"
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({rating})</span>
        </div>

        {/* Price Section */}
        <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
          <p
            className="text-lg sm:text-xl md:text-2xl font-bold 
                      bg-gradient-to-r from-indigo-400 to-purple-400 
                      bg-clip-text text-transparent"
          >
            ${price}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 line-through">
            ${(price * 1.3).toFixed(2)}
          </p>
        </div>

        {/* Discount Badge */}
        <div className="mt-2">
          <span
            className="inline-block text-xs font-semibold text-green-400 
                         bg-green-500/10 px-2 py-0.5 rounded-full"
          >
            Save {Math.round(((price * 1.3 - price) / (price * 1.3)) * 100)}%
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            if (!user) return Navigate("/login");
            addToCart(id, 1);
            toast.success("Added to cart!");
          }}
          className="mt-auto w-full 
                   py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:from-indigo-700 hover:to-purple-700
                   text-white font-bold text-xs sm:text-sm md:text-base
                   flex items-center justify-center gap-2
                   shadow-lg shadow-indigo-900/50 
                   hover:shadow-xl hover:shadow-indigo-900/70
                   transition-all duration-300 transform hover:scale-105"
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

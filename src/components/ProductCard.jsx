import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  image,
  title,
  price,
  rating = 5,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 w-[260px] flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[40px]">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Price */}
        <p className="mt-2 text-lg font-bold text-gray-900">
          ${price}
        </p>

        {/* Add to Cart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

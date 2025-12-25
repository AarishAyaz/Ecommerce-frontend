import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.wowpetspalace.com/test/product/getallproducts"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products`);
        }

        const data = await response.json();
        setProducts(data.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <h2 className="text-xl text-gray-400 mt-4">Loading products...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 inline-block">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-10 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-black via-slate-900 to-black relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 backdrop-blur-md 
                          border border-purple-400/30 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Trending Now
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3
                         bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Featured Products
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              Discover our handpicked collection of premium products
            </p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 
                       border border-slate-700 hover:border-indigo-500
                       flex items-center justify-center transition-all duration-300
                       hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 
                       border border-slate-700 hover:border-indigo-500
                       flex items-center justify-center transition-all duration-300
                       hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scroll-smooth
                   scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => {
            const imageUrl = product.featured_image
              ? `https://www.wowpetspalace.com/test/${product.featured_image}`
              : product.images?.length
                ? `https://www.wowpetspalace.com/test/${product.images[0]}`
                : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80";

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={imageUrl}
                title={product.name}
                price={product.original_price}
                rating={product.overall_rating || 5}
                onAddToCart={() => console.log(`Add ${product.name} to cart`)}
              />
            );
          })}
        </div>
      </div>

      {/* View All Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 sm:mt-12">
        <button
          className="group inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4
                   bg-gradient-to-r from-purple-600 to-indigo-600 
                   hover:from-purple-700 hover:to-indigo-700
                   text-white text-sm sm:text-base md:text-lg font-bold rounded-full
                   shadow-xl shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/70
                   transition-all duration-300 transform hover:scale-105"
        >
          <span>View All Products</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;
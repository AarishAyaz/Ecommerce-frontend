import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to load products",err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-400">
        Loading products...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        {error}
      </section>
    );
  }

  // Optional: only show in-stock
  const featured = products.filter(p => p.countInStock > 0);

  return (
    <section
      id="products"
      className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 
                          border border-purple-400/30 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold uppercase">
              Trending Now
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured Products
          </h2>

          <p className="text-gray-400">
            Discover our handpicked collection
          </p>
        </div>

        <div className="hidden md:flex gap-3">
          <button onClick={scrollLeft} className="nav-btn">
            <ChevronLeft />
          </button>
          <button onClick={scrollRight} className="nav-btn">
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth scrollbar-hide"
        >
          {featured.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={`http://localhost:5000${product.image}`}
              title={product.name}
              price={product.price}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))}
        </div>
      </div>

      {/* View all */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/products")}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 
                     text-white font-bold rounded-full"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductsSection;

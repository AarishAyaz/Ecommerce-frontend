import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Loading products...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-600">{error}</section>
    );
  }

return (
  <section id="products" className="py-20 bg-gray-50 relative">
    {/* Heading */}
    <div className="max-w-7xl mx-auto px-6 mb-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Featured Products
      </h1>
      <p className="mt-2 text-gray-600">
        Explore our trending products with top quality and great value.
      </p>
    </div>

    {/* Scroll Buttons */}
    <button
      onClick={scrollLeft}
      className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
    >
      <ChevronLeft size={24} />
    </button>

    <button
      onClick={scrollRight}
      className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
    >
      <ChevronRight size={24} />
    </button>

    {/* Product Row */}
    <div className="max-w-7xl mx-auto px-6">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto flex-nowrap pb-4 scroll-smooth"
      >
        {products.map((product) => {
          const imageUrl = product.featured_image
            ? `https://www.wowpetspalace.com/test/${product.featured_image}`
            : product.images?.length
              ? `https://www.wowpetspalace.com/test/${product.images[0]}`
              : "/placeholder.png";

          return (
            <div key={product.id} className="min-w-[260px]">
              <ProductCard
                id={product.id}
                image={imageUrl}
                title={product.name}
                price={product.original_price}
                rating={product.overall_rating || 5}
              />
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
};
export default ProductsSection;

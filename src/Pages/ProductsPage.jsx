import { useEffect, useState } from "react";
import axios from "../axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">{error}</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black via-slate-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          All Products
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-400 text-center">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
        )}
      </div>
    </section>
  );
};

export default ProductsPage;

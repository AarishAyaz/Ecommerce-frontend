import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details",err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-20 text-red-400">{error || "Product not found"}</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black via-slate-900 to-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{product.name}</h1>
          <p className="text-xl text-gray-300 font-semibold">${product.price}</p>
          <p className="text-gray-400">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-green-400 font-semibold">
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            <button
              onClick={() => console.log(`Add ${product.name} to cart`)}
              disabled={product.countInStock === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600
                         text-white font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-4 py-2 text-sm text-gray-400 hover:underline"
          >
            Back to All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

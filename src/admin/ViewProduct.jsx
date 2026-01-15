import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-gray-400 p-6">Loading product...</p>;
  if (!product) return <p className="text-red-400 p-6">Product not found</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto mt-50 text-white bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded-lg mb-6 object-cover"
        />
      )}

      <p className="mb-2">
        <span className="font-semibold">Description: </span>
        {product.description || "No description"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Price: </span>${product.price.toFixed(2)}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Category: </span>
        {product.category?.name || "Uncategorized"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Brand: </span>{product.brand || "N/A"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Stock Count: </span>{product.countInStock}
      </p>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;

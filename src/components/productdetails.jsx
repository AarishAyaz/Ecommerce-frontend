import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://www.wowpetspalace.com/test/product/getproduct/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();
        setProduct(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg shadow"
        />

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-6 text-2xl font-semibold">
            Rs. {product.price}
          </p>

          <button
            className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;

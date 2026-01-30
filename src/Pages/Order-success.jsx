import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) throw new Error("Order not found");

        const data = await res.json();
        setOrder(data);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token, navigate]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Successful 🎉
      </h1>

      <p className="mb-6">
        Your order <strong>#{order._id}</strong> has been placed.
      </p>

      <div className="border rounded-lg p-4 text-left">
        {order.items.map((i) => (
          <div
            key={i.product}
            className="flex justify-between border-b py-2"
          >
            <span>{i.product?.name || "Product"}</span>
            <span>
              {i.quantity} × ${i.price}
            </span>
            <span>${i.quantity * i.price}</span>
          </div>
        ))}

        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total</span>
          <span>${order.totalAmount}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccessPage;
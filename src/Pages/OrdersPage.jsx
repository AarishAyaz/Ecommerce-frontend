import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (!orders.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-500 mb-6">You have not placed any orders yet.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <p className="font-semibold">
                Order #{order._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Items: {order.items.length}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <p className="font-semibold text-lg">
                ${order.totalAmount}
              </p>

              <button
                onClick={() => navigate(`/order-success/${order._id}`)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
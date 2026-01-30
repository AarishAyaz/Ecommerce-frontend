import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  useEffect(() => {
    if (!cart.length) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const total = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cart.map((i) => (
          <div
            key={i.product._id}
            className="flex justify-between border-b py-2 text-sm"
          >
            <span>
              {i.product.name} × {i.quantity}
            </span>
            <span>${i.product.price * i.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <button
        onClick={placeOrder}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-lg w-full disabled:opacity-60"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
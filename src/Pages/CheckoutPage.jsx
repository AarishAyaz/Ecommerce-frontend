import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

const placeOrder = async () => {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" // optional but good practice
    }
  });

  if (!res.ok) {
    const data = await res.json();
    return alert(data.message || "Order failed");
  }

  const data = await res.json();
  console.log("Order placed:", data);

  clearCart();
  navigate("/orders-success");
};


  return (
    <div className="max-w-xl mx-auto p-6">
      <button
        onClick={placeOrder}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;

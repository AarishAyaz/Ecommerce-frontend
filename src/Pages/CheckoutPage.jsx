import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext  from "../context/CartContext";


const CheckoutPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const placeOrder = async () => {
    await fetch("/api/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/orders-success");
  };

  return (
    <button onClick={placeOrder} className="bg-indigo-600 text-white px-6 py-3">
      Place Order
    </button>
  );
};
export default CheckoutPage;

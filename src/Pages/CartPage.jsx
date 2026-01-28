import { useContext } from "react";
import CartContext  from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((i) => (
        <div key={i.product._id} className="flex justify-between mb-4">
          <span>
            {i.product.name} × {i.quantity}
          </span>
          <span>${i.product.price * i.quantity}</span>
        </div>
      ))}

      <div className="text-xl font-semibold mt-6">
        Total: ${total}
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;

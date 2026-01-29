import { useContext } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  if (!cart.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((i) => (
        <div
          key={i.product._id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <p className="font-semibold">{i.product.name}</p>
            <p className="text-sm text-gray-500">
              Price: ${i.product.price}
            </p>
            <p className="text-sm">Qty: {i.quantity}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">
              ${i.product.price * i.quantity}
            </span>
            <button
              onClick={() => removeFromCart(i.product._id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
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

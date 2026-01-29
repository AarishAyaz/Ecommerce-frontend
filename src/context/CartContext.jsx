import { createContext, useEffect, useState, useContext } from "react";
import axios from "../axios"; // 👈 YOUR INSTANCE
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

const fetchCart = async () => {
  if (!user) return setCart([]);

  try {
    const res = await axios.get("/api/cart");
    console.log("CART RESPONSE:", res.data);

    const items = (res.data.items || []).filter(
      i => typeof i.product === "object"
    );

    setCart(items);
  } catch (err) {
    console.error("Fetch cart failed", err);
    setCart([]);
  }
};


  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post("/api/cart/add", { productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error("Add to cart failed", err);
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      await fetchCart();
    } catch (err) {
      console.error("Remove cart item failed", err);
    }
  };

  useEffect(() => {
      console.log("AUTH USER IN CART CONTEXT:", user);

    fetchCart();
  }, [user]);
  const clearCart = async () => {
  try {
    await axios.delete("/api/cart/clear");
    setCart([]);
  } catch (err) {
    console.error("Clear cart failed", err);
  }
};


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, fetchCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};


export default CartContext;

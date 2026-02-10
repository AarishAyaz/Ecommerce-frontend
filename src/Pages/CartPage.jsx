import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  Truck,
  Shield
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const subtotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      if (updateQuantity) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Add your coupon logic here
      console.log("Applying coupon:", couponCode);
    }
  };

  // Empty Cart State
  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center gap-2 text-sm mb-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">Cart</span>
          </nav>
        </div>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-800/50 border border-slate-700/50 rounded-full mb-8">
              <ShoppingCart className="w-12 h-12 text-gray-500" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Cart is Empty
            </h1>
            
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            
            <button
              onClick={() => navigate("/products")}
              className="group inline-flex items-center gap-2 px-8 py-4
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500
                       text-white font-bold rounded-full
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">Shopping Cart</span>
          </nav>
        </div>

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/20 border border-indigo-400/30 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Shopping Cart
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 
                         hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-full sm:w-32 h-32 bg-slate-900 rounded-xl overflow-hidden">
                      <img
                        src={`${BASE_URL}${item.product.image}`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-2 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Remove Button - Desktop */}
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="hidden sm:flex items-center gap-2 px-4 py-2
                                 text-red-400 hover:text-red-300 hover:bg-red-500/10
                                 border border-red-500/20 hover:border-red-500/40
                                 rounded-lg transition-all duration-200
                                 focus:outline-none focus:ring-2 focus:ring-red-400"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>

                    {/* Quantity Controls and Price */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-3 hover:bg-slate-700/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="px-6 py-3 text-white font-semibold min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          disabled={item.quantity >= (item.product.countInStock || 999)}
                          className="p-3 hover:bg-slate-700/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button - Mobile */}
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="sm:hidden flex items-center gap-2 px-4 py-2 mt-4
                               text-red-400 hover:text-red-300 hover:bg-red-500/10
                               border border-red-500/20 hover:border-red-500/40
                               rounded-lg transition-all duration-200 w-full justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Remove Item</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Button - Mobile */}
            <button
              onClick={() => navigate("/products")}
              className="lg:hidden w-full flex items-center justify-center gap-2 px-6 py-3
                       bg-slate-800/50 border border-slate-700/50
                       hover:bg-slate-700/50 hover:border-slate-600
                       text-white font-medium rounded-xl
                       transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <div className="flex justify-between text-white">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-blue-400 text-sm">
                    Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Have a coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3
                             bg-slate-900/50 border border-slate-700/50
                             text-white placeholder-gray-500
                             rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-3
                             bg-slate-700/50 border border-slate-600/50
                             hover:bg-slate-600/50
                             text-white font-medium rounded-xl
                             transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 mb-4
                         bg-gradient-to-r from-green-600 to-emerald-600
                         hover:from-green-500 hover:to-emerald-500
                         text-white font-bold rounded-xl
                         shadow-lg hover:shadow-xl
                         transform hover:scale-105
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Continue Shopping - Desktop */}
              <button
                onClick={() => navigate("/products")}
                className="hidden lg:flex w-full items-center justify-center gap-2 px-6 py-3
                         bg-slate-700/50 border border-slate-600/50
                         hover:bg-slate-600/50
                         text-white font-medium rounded-xl
                         transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Truck className="w-5 h-5 text-green-400" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
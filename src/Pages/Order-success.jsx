import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  CheckCircle,
  Package,
  MapPin,
  CreditCard,
  Calendar,
  ShoppingBag,
  AlertCircle,
  Download,
  Mail,
  Truck,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import CartContext from "../context/CartContext";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useContext(CartContext);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrder();
  }, [id, token, navigate]);

  useEffect(() => {
    clearCart();
  }, []);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Order not found");
      }

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
      setError("Order not found");
      toast.error("Order not found");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchOrder();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      case "processing":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Order Not Found
            </h2>

            <p className="text-gray-400 mb-8 text-lg">
              We couldn't find this order. It may have been removed or you don't
              have access to it.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = order.subtotal || order.totalAmount || 0;
  const shipping = order.shipping || 0;
  const tax = order.tax || 0;
  const total = order.total || order.totalAmount || 0;

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
            <button
              onClick={() => navigate("/orders")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              My Orders
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">Order Confirmation</span>
          </nav>
        </div>

        {/* Success Header */}
        <div className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 border-4 border-green-500/50 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Order Placed Successfully! 🎉
          </h1>

          <p className="text-gray-400 text-lg mb-2">
            Thank you for your purchase!
          </p>

          <p className="text-white text-xl font-semibold mb-6">
            Order ID:{" "}
            <span className="text-green-400">
              #{order._id.slice(-8).toUpperCase()}
            </span>
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full">
            <Mail className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">
              Confirmation email sent to{" "}
              {order.shippingInfo?.email || order.user?.email}
            </span>
          </div>
        </div>

        {/* Order Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Order Status</h2>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-xl ${getStatusColor(order.status)}`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-semibold capitalize">
                    {order.status || "Pending"}
                  </span>
                </div>
                <p className="text-gray-400">
                  Order placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Order Items</h2>
              </div>

              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 bg-slate-900/50 rounded-xl p-4"
                  >
                    <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product?.image && (
                        <img
                          src={
                            item.product?.image
                              ? `${BASE_URL}${item.product.image.startsWith("/") ? "" : "/"}${item.product.image}`
                              : "/placeholder.png"
                          }
                          alt={item.product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        {item.product?.name || "Product"}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-white font-semibold">
                        ${item.price?.toFixed(2)} × {item.quantity} = $
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            {order.shippingInfo && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Shipping Address
                  </h2>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 space-y-2">
                  <p className="text-white font-semibold">
                    {order.shippingInfo.fullName}
                  </p>
                  <p className="text-gray-300">{order.shippingInfo.address}</p>
                  <p className="text-gray-300">
                    {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                    {order.shippingInfo.zipCode}
                  </p>
                  {order.shippingInfo.country && (
                    <p className="text-gray-300">
                      {order.shippingInfo.country}
                    </p>
                  )}
                  <div className="pt-2 border-t border-slate-700/50 mt-2">
                    <p className="text-gray-400 text-sm">
                      Phone: {order.shippingInfo.phone}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Email: {order.shippingInfo.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">
                  Payment Method
                </h2>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4">
                <p className="text-white font-semibold capitalize">
                  {order.paymentMethod === "card" && "💳 Credit / Debit Card"}
                  {order.paymentMethod === "paypal" && "PayPal"}
                  {order.paymentMethod === "cod" && "📦 Cash on Delivery"}
                  {!order.paymentMethod && "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sticky top-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="space-y-3">
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
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-slate-700/50">
                  <div className="flex justify-between text-white">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-green-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expected Delivery */}
              <div className="border-t border-slate-700/50 pt-6">
                <div className="flex items-start gap-3 bg-green-600/10 border border-green-500/30 rounded-xl p-4">
                  <Truck className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">
                      Expected Delivery
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(
                        Date.now() + 5 * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 border-t border-slate-700/50 pt-6">
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3
                           bg-indigo-600 hover:bg-indigo-500
                           text-white font-bold rounded-xl
                           shadow-lg hover:shadow-xl
                           transform hover:scale-105
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <Package className="w-5 h-5" />
                  <span>View All Orders</span>
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3
                           bg-slate-700/50 border border-slate-600/50
                           hover:bg-slate-600/50
                           text-white font-medium rounded-xl
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Continue Shopping</span>
                </button>
              </div>

              {/* Support */}
              <div className="border-t border-slate-700/50 pt-6">
                <p className="text-gray-400 text-sm text-center">
                  Need help?{" "}
                  <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Contact Support
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios.js";
import toast from "react-hot-toast";
import {
  Home,
  ChevronRight,
  ShoppingCart,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Truck,
  Edit
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await axios.get(`/api/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setOrder(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load order details");
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setUpdating(true);
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      await axios.put(
        `/api/admin/orders/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(`Order marked as ${newStatus}`);
      fetchOrderDetails();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'pending':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'processing':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
            <p className="text-gray-400">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {error || "Order not found"}
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={fetchOrderDetails}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/admin/orders")}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Back to Orders
              </button>
            </div>
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
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <button
              onClick={() => navigate("/admin/orders")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Orders
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">#{order._id.slice(-8).toUpperCase()}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status || 'pending'}</span>
                </span>
                <span className="text-gray-400">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/admin/orders")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50
                       hover:bg-slate-700/50 text-white rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Orders</span>
            </button>
          </div>

          {/* Status Update Buttons */}
          {order.status?.toLowerCase() !== 'completed' && order.status?.toLowerCase() !== 'cancelled' && (
            <div className="mb-8 flex flex-wrap gap-3">
              <button
                onClick={() => updateOrderStatus('processing')}
                disabled={updating || order.status?.toLowerCase() === 'processing'}
                className="flex items-center gap-2 px-6 py-3
                         bg-blue-600/20 border border-blue-500/30
                         hover:bg-blue-600/30
                         text-blue-400 font-medium rounded-lg
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Package className="w-5 h-5" />
                <span>Mark as Processing</span>
              </button>

              <button
                onClick={() => updateOrderStatus('completed')}
                disabled={updating}
                className="flex items-center gap-2 px-6 py-3
                         bg-green-600/20 border border-green-500/30
                         hover:bg-green-600/30
                         text-green-400 font-medium rounded-lg
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark as Completed</span>
              </button>

              <button
                onClick={() => updateOrderStatus('cancelled')}
                disabled={updating}
                className="flex items-center gap-2 px-6 py-3
                         bg-red-600/20 border border-red-500/30
                         hover:bg-red-600/30
                         text-red-400 font-medium rounded-lg
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="w-5 h-5" />
                <span>Cancel Order</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Left Column - Order Items & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Order Items</h2>
              </div>

              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-slate-900/50 rounded-xl p-4">
                    <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product?.image && (
                        <img
                          src={`${BASE_URL}${item.product.image}`}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        {item.product?.name || 'Product'}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-white font-semibold">
                        ${item.product?.price?.toFixed(2)} × {item.quantity} = ${(item.product?.price * item.quantity).toFixed(2)}
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
                  <MapPin className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Full Name</p>
                    <p className="text-white font-semibold">{order.shippingInfo.fullName}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white">{order.shippingInfo.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white">{order.shippingInfo.phone}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Shipping Address</p>
                    <p className="text-white">
                      {order.shippingInfo.address}<br />
                      {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                      {order.shippingInfo.country && <><br />{order.shippingInfo.country}</>}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Payment Information</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Payment Method</p>
                  <p className="text-white font-semibold capitalize">
                    {order.paymentMethod === 'card' && '💳 Credit / Debit Card'}
                    {order.paymentMethod === 'paypal' && 'PayPal'}
                    {order.paymentMethod === 'cod' && '📦 Cash on Delivery'}
                    {!order.paymentMethod && 'Not specified'}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Payment Status</p>
                  <p className="text-white font-semibold">
                    {order.paymentMethod === 'cod' ? 'Pending (COD)' : 'Paid'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sticky top-8 space-y-6">
              {/* Customer Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Customer</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-semibold">{order.user?.name || 'Unknown User'}</p>
                  <p className="text-gray-400 text-sm">{order.user?.email || 'No email'}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold">${order.subtotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {order.shipping === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        `$${order.shipping?.toFixed(2) || '0.00'}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="font-semibold">${order.tax?.toFixed(2) || '0.00'}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-700/50">
                    <div className="flex justify-between text-white">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-2xl font-bold">${order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="border-t border-slate-700/50 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Order Placed</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {order.updatedAt && order.updatedAt !== order.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Edit className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Last Updated</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
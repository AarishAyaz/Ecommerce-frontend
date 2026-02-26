import { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import {
  Home,
  ChevronRight,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  CheckCircle2,
  Package,
  Truck,
  Shield
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  // ✅ FIX: Use useMemo to prevent object reference changes on every render
  const auth = useMemo(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  }, []);
  
  const token = auth?.token;
  const user = auth?.user;

  // ✅ FIX: Only run once on mount (empty dependency array)
  // or use specific primitive values if you need reactivity
  useEffect(() => {
    if (user?.name || user?.email) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user?.name, user?.email]); // Use primitive values instead of object

  // ... rest of your code remains the same

  const subtotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const validateShipping = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    for (let field of required) {
      if (!shippingInfo[field]) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep(2);
    }
  };

  const handleContinueToReview = () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    setError("");
    setStep(3);
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const orderData = {
        shippingInfo,
        paymentMethod,
        items: cart,
        subtotal,
        shipping,
        tax,
        total
      };

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      // Navigate first, then clear cart after a short delay
  
// Then navigate
navigate(`/order-success/${data._id}`, { replace: true });
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => navigate("/cart")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cart
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">Checkout</span>
          </nav>
        </div>

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600/20 border border-green-400/30 rounded-xl">
              <CreditCard className="w-6 h-6 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Checkout
            </h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: "Shipping", icon: MapPin },
              { num: 2, label: "Payment", icon: CreditCard },
              { num: 3, label: "Review", icon: CheckCircle2 }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200
                      ${step >= s.num
                        ? 'bg-green-600 border-green-400 text-white'
                        : 'bg-slate-800/50 border-slate-700 text-gray-500'
                      }`}
                  >
                    {step > s.num ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                
                {idx < 2 && (
                  <div className={`w-16 sm:w-24 h-0.5 mb-8 mx-2 transition-all duration-200
                    ${step > s.num ? 'bg-green-500' : 'bg-slate-700'}`} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="fullName"
                          value={shippingInfo.fullName}
                          onChange={handleShippingChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3
                                   bg-slate-900/50 border border-slate-700/50
                                   text-white placeholder-gray-500
                                   rounded-xl
                                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                   transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3
                                   bg-slate-900/50 border border-slate-700/50
                                   text-white placeholder-gray-500
                                   rounded-xl
                                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                   transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-12 pr-4 py-3
                                 bg-slate-900/50 border border-slate-700/50
                                 text-white placeholder-gray-500
                                 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="123 Main Street, Apt 4B"
                      className="w-full px-4 py-3
                               bg-slate-900/50 border border-slate-700/50
                               text-white placeholder-gray-500
                               rounded-xl
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                               transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        placeholder="New York"
                        className="w-full px-4 py-3
                                 bg-slate-900/50 border border-slate-700/50
                                 text-white placeholder-gray-500
                                 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        placeholder="NY"
                        className="w-full px-4 py-3
                                 bg-slate-900/50 border border-slate-700/50
                                 text-white placeholder-gray-500
                                 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        placeholder="10001"
                        className="w-full px-4 py-3
                                 bg-slate-900/50 border border-slate-700/50
                                 text-white placeholder-gray-500
                                 rounded-xl
                                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                                 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      placeholder="United States"
                      className="w-full px-4 py-3
                               bg-slate-900/50 border border-slate-700/50
                               text-white placeholder-gray-500
                               rounded-xl
                               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                               transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4
                           bg-gradient-to-r from-green-600 to-emerald-600
                           hover:from-green-500 hover:to-emerald-500
                           text-white font-bold rounded-xl
                           shadow-lg hover:shadow-xl
                           transform hover:scale-105
                           transition-all duration-200"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {/* Credit Card */}
                  <label className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all
                    ${paymentMethod === 'card' 
                      ? 'bg-green-600/10 border-green-500/50' 
                      : 'bg-slate-900/30 border-slate-700/50 hover:border-slate-600'}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold">Credit / Debit Card</span>
                      </div>
                      <p className="text-gray-400 text-sm">Pay securely with your card</p>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all
                    ${paymentMethod === 'paypal' 
                      ? 'bg-green-600/10 border-green-500/50' 
                      : 'bg-slate-900/30 border-slate-700/50 hover:border-slate-600'}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">PayPal</span>
                      </div>
                      <p className="text-gray-400 text-sm">Pay with your PayPal account</p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all
                    ${paymentMethod === 'cod' 
                      ? 'bg-green-600/10 border-green-500/50' 
                      : 'bg-slate-900/30 border-slate-700/50 hover:border-slate-600'}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold">Cash on Delivery</span>
                      </div>
                      <p className="text-gray-400 text-sm">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4
                             bg-slate-700/50 border border-slate-600/50
                             hover:bg-slate-600/50
                             text-white font-medium rounded-xl
                             transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleContinueToReview}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4
                             bg-gradient-to-r from-green-600 to-emerald-600
                             hover:from-green-500 hover:to-emerald-500
                             text-white font-bold rounded-xl
                             shadow-lg hover:shadow-xl
                             transform hover:scale-105
                             transition-all duration-200"
                  >
                    <span>Review Order</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Shipping Details */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-bold text-white">Shipping Address</h3>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-green-400 hover:text-green-300 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-gray-300 space-y-1">
                    <p className="font-semibold text-white">{shippingInfo.fullName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    {shippingInfo.country && <p>{shippingInfo.country}</p>}
                    <p className="pt-2">{shippingInfo.email}</p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-bold text-white">Payment Method</h3>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="text-green-400 hover:text-green-300 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-300 capitalize">
                    {paymentMethod === 'card' && '💳 Credit / Debit Card'}
                    {paymentMethod === 'paypal' && 'PayPal'}
                    {paymentMethod === 'cod' && '📦 Cash on Delivery'}
                  </p>
                </div>

                {/* Place Order Button */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4
                             bg-slate-700/50 border border-slate-600/50
                             hover:bg-slate-600/50
                             text-white font-medium rounded-xl
                             transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4
                             bg-gradient-to-r from-green-600 to-emerald-600
                             hover:from-green-500 hover:to-emerald-500
                             text-white font-bold rounded-xl
                             shadow-lg hover:shadow-xl
                             transform hover:scale-105
                             transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>Place Order (${total.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Lock className="w-5 h-5 text-green-400" />
                    <span>256-bit SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Truck className="w-5 h-5 text-green-400" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product._id} className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={`${BASE_URL}${item.product.image}`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{item.product.name}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      <p className="text-white font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-slate-700/50">
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

                <div className="pt-3 border-t border-slate-700/50">
                  <div className="flex justify-between text-white">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
import { useState } from "react";
import { ShoppingBag, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      // Using axios as in your original code
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    const authData = {
      token : data.token,
  user: {
    id: data.user._id,
    name: data.user.name,
    email: data.user.email,
    isAdmin: data.user.isAdmin,
  },
};

  localStorage.setItem("auth", JSON.stringify(authData));
// localStorage.setItem("token", data.token);   // store only the JWT string
// localStorage.setItem("auth", JSON.stringify(authData)); // store user info separately


      // Success toast
      if (toast) {
        toast.success(`Welcome back, ${data.user.name}`);
      }

      // Navigate to home
if (data.user.isAdmin) {
  navigate("/admin/dashboard");
} else {
  navigate("/");
}

    } catch (error) {
      if (toast) {
        toast.error(
          error.response?.data?.message || "Invalid email or password"
        );
      } else {
        alert(error.response?.data?.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    if (navigate) {
      navigate("/signup");
    }
  };

return (
  <div className="min-h-screen w-full flex items-center justify-center
                  bg-gradient-to-br from-gray-900 via-slate-900 to-black
                  px-4 py-6">

    <div className="w-full max-w-[clamp(22rem,38vw,34rem)]">

      {/* Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900
                      rounded-3xl shadow-2xl border border-slate-700
                      max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                        px-6 py-6 shrink-0 overflow-hidden">

          {/* Decorative blurs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            <h1 className="font-bold text-white
                           text-[clamp(1.4rem,2.1vw,2.1rem)]">
              Welcome Back
            </h1>

            <p className="text-blue-100 mt-1
                          text-[clamp(0.85rem,1.05vw,1rem)]">
              Sign in to access your account
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-gray-200 font-medium mb-1
                                text-[clamp(0.8rem,1vw,0.95rem)]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5
                             bg-slate-700 border border-slate-600 rounded-xl
                             text-white placeholder:text-gray-400
                             text-[clamp(0.85rem,1vw,1rem)]
                             focus:outline-none focus:border-indigo-500
                             focus:ring-2 focus:ring-indigo-500/30
                             transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-200 font-medium mb-1
                                text-[clamp(0.8rem,1vw,0.95rem)]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2
                                 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5
                             bg-slate-700 border border-slate-600 rounded-xl
                             text-white placeholder:text-gray-400
                             text-[clamp(0.85rem,1vw,1rem)]
                             focus:outline-none focus:border-indigo-500
                             focus:ring-2 focus:ring-indigo-500/30
                             transition"
                />
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/forgot-password")}
                type="button"
                className="text-indigo-400 hover:text-indigo-300
                           text-[clamp(0.75rem,0.9vw,0.9rem)]
                           font-semibold transition cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              
              disabled={loading}
              className="w-full mt-1 py-3 rounded-xl font-semibold
                         text-[clamp(0.9rem,1.1vw,1.05rem)]
                         bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                         hover:brightness-110 transition
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-800 text-gray-400
                               text-[clamp(0.7rem,0.85vw,0.85rem)]">
                New here?
              </span>
            </div>
          </div>

          {/* Signup */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSignupClick}
              className="text-gray-300 hover:text-indigo-400
                         text-[clamp(0.8rem,1vw,0.95rem)]
                         font-semibold transition cursor-pointer"
            >
              Create an account
            </button>
          </div>
        </div>
        </form>
      </div>
      

      {/* Footer */}
      <p className="mt-5 text-center text-gray-400
                    text-[clamp(0.7rem,0.85vw,0.85rem)] px-4">
        By signing in, you agree to our{" "}
        <span className="text-indigo-400 hover:underline cursor-pointer">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="text-indigo-400 hover:underline cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>
  </div>
);
};
export default Login;
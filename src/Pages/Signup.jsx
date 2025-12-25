import { useState } from "react";
import { ShoppingBag, Mail, Lock, User, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   try {
      const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
         { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.token);
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };



  // const handleLoginClick = () => {
  //   // In your app this will be: navigate("/login")
  //   console.log("Navigating to login...");
  // };

  
  return (
    <div className="min-h-screen w-full flex items-center justify-center
                    bg-gradient-to-br from-gray-900 via-slate-900 to-black
                    px-4 py-6">

      {/* Card wrapper */}
      <div className="w-full max-w-[clamp(22rem,40vw,36rem)]">

        <div className="bg-gradient-to-br from-slate-800 to-slate-900
                        rounded-2xl shadow-2xl border border-slate-700
                        max-h-[90vh] overflow-hidden flex flex-col">

          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                          px-6 py-6 shrink-0 overflow-hidden">

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-indigo-600" />
                </div>
              </div>

              <h1 className="font-bold text-white
                             text-[clamp(1.4rem,2.2vw,2.2rem)]">
                Create Account
              </h1>

              <p className="text-blue-100 mt-1
                            text-[clamp(0.85rem,1.1vw,1.05rem)]">
                Sign up to get started
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-gray-200 font-medium mb-1
                                  text-[clamp(0.8rem,1vw,0.95rem)]">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2
                                   w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-3 py-2.5
                               bg-slate-700 border border-slate-600 rounded-lg
                               text-white placeholder:text-gray-400
                               text-[clamp(0.85rem,1vw,1rem)]
                               focus:outline-none focus:border-indigo-500
                               focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

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
                               bg-slate-700 border border-slate-600 rounded-lg
                               text-white placeholder:text-gray-400
                               text-[clamp(0.85rem,1vw,1rem)]
                               focus:outline-none focus:border-indigo-500
                               focus:ring-2 focus:ring-indigo-500/30"
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
                               bg-slate-700 border border-slate-600 rounded-lg
                               text-white placeholder:text-gray-400
                               text-[clamp(0.85rem,1vw,1rem)]
                               focus:outline-none focus:border-indigo-500
                               focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-lg font-semibold
                           text-[clamp(0.9rem,1.1vw,1.1rem)]
                           bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                           hover:brightness-110 transition
                           disabled:opacity-60 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
              >
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-gray-400
                          text-[clamp(0.7rem,0.9vw,0.85rem)]">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-indigo-400 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Signup;
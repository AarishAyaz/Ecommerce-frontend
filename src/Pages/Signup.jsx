import React, { useState } from "react";
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4 sm:px-6 lg:px-8">
      <div
        className="
          w-full
          max-w-sm
          sm:max-w-md
          lg:max-w-lg
          xl:max-w-xl
          2xl:max-w-2xl
          bg-white
          rounded-2xl
          shadow-xl
          p-6
          sm:p-8
          lg:p-10
          xl:p-12
        "
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h1
            className="
              font-bold text-gray-800
              text-xl
              sm:text-2xl
              lg:text-3xl
              xl:text-4xl
            "
          >
            Create Account
          </h1>
          <p
            className="
              text-gray-500 mt-2
              text-xs
              sm:text-sm
              lg:text-base
            "
          >
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 text-xs sm:text-sm lg:text-base mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
              className="
                w-full rounded-lg border border-gray-300
                px-3 py-2
                sm:px-4 sm:py-2.5
                lg:px-5 lg:py-3
                text-xs sm:text-sm lg:text-base
                focus:outline-none focus:ring-2 focus:ring-gray-800
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 text-xs sm:text-sm lg:text-base mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full rounded-lg border border-gray-300
                px-3 py-2
                sm:px-4 sm:py-2.5
                lg:px-5 lg:py-3
                text-xs sm:text-sm lg:text-base
                focus:outline-none focus:ring-2 focus:ring-gray-800
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 text-xs sm:text-sm lg:text-base mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full rounded-lg border border-gray-300
                px-3 py-2
                sm:px-4 sm:py-2.5
                lg:px-5 lg:py-3
                text-xs sm:text-sm lg:text-base
                focus:outline-none focus:ring-2 focus:ring-gray-800
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg bg-gray-900 text-white
              py-2.5 sm:py-3 lg:py-3.5
              text-sm sm:text-base lg:text-lg
              font-medium
              transition
              hover:bg-gray-800
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs sm:text-sm lg:text-base text-gray-500">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="ml-1 text-gray-900 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

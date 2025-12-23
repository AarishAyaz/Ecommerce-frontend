import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const{data} = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {name, email, password}
            );
            localStorage.setItem("token", data.token);
                  toast.success("Signup successful");

            navigate("/Login");
        } catch (error) {
            alert(
                error.response?.data?.message || "Registration failed"
            );
        }finally {
      setLoading(false);
    }
        }
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

          {/* Button */}
          {/* <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium
                       hover:bg-gray-800 transition duration-200 cursor-pointer"
          >
            Sign Up
          </button> */}
           <button
           type='submit'
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
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

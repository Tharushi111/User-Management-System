import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignIn = () => {
  const [form, setForm] = useState({ gmail: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", form);

      const userData = response.data.user; // Assuming user data comes here
      localStorage.setItem("user", JSON.stringify(userData));

      // Notify Nav and other listeners about user change
      window.dispatchEvent(new Event("userChanged"));

      toast.success("Signin successful!");
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-indigo-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full pl-10 bg-white text-black focus:bg-white focus:text-black"
              required
              value={form.gmail}
              onChange={(e) => setForm({ ...form, gmail: e.target.value })}
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-indigo-500">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full pl-10 bg-white text-black focus:text-black"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-indigo w-full text-white">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
